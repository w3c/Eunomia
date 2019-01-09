/**
 * @file Persistence layer
 * @author Antonio Olmo Titos <a@olmo-titos.info>
 * @exports lib/persistence
 */

// Configuration:
const CONFIG = require('../config');

// External packages:
const PROCESS = require('process'),
    SQLITE = require('sqlite3');

// Internal packages:
const LOGGING = require('./logging'),
    UTIL = require('./util');

// Variables:
var connection;

/**
 * Terminate the DB connection (gracefully)
 */

const wrapUp = function() {
    connection.close();
    LOGGING.info(`connection to DB file closed`);
    PROCESS.exit();
};

/**
 * Run a query and retrieve a set of rows from the DB
 * @param {String} query - the SQL query
 * @param {String} params - (optional; variable length) values to interpolate in the query
 * @returns {Array} the resulting rows
 */

const retrieveRows = function(query, ...params) {
    return new Promise(function(resolve, reject) {
        connection.all(query, params, function(err, rows) {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};

/**
 * Set up persistence
 */

const setUp = function() {
    if (connection)
        LOGGING.warn(`“persistence.setUp()” called more than once`);
    else {
        if (CONFIG.debug)
            SQLITE.verbose();
        // @TODO: handle issues.
        connection = new SQLITE.Database(CONFIG.db, SQLITE.OPEN_READWRITE);
        connection.exec('PRAGMA foreign_keys = ON;');
        LOGGING.info(`persistence linked to file “${CONFIG.db}”`);
        PROCESS.on('SIGINT', wrapUp);
        // Export more stuff:
        exports.TYPE_PERSON = 'people';
        exports.TYPE_MEETING = 'meetings';
        exports.TYPE_LOCATION = 'locations';
        // exports.createEntity = createEntity;
        exports.listEntities = listEntities;
        exports.findEntity = findEntity;
    }
};

// const createEntity = function(type) {
//     return new Promise(function(resolve, reject) {
//         if (exports.TYPE_PERSON === type)
//             retrieveRows(`INSERT INTO ${type} VALUES;`).then(function(rows) {
//                 resolve(rows);
//             }).catch(function(err) {
//                 LOGGING.debug(`“persistence.listEntities()” error: ${err}`);
//                 reject(err);
//             });
//         else if (exports.TYPE_MEETING === type)
//             ;
//         else if (exports.TYPE_LOCATION === type)
//             ;
//         else
//             reject();
//     });
// };

/**
 * Return all entities of a given type
 * @param {String} type - type; use constants of the form <code>persistence.TYPE_*</code>
 * @returns {Array} all entities of that type
 */

const listEntities = function(type) {
    return new Promise(function(resolve, reject) {
        if (exports.TYPE_PERSON === type || exports.TYPE_MEETING === type || exports.TYPE_LOCATION === type) {
            retrieveRows(`SELECT * FROM ${type} ORDER BY name;`).then(function(rows) {
                UTIL.processData(rows);
                resolve(rows);
            }).catch(function(err) {
                LOGGING.warn(`“persistence.listEntities()” error: ${err}`);
                reject(err);
            });
        } else
            reject();
    });
};

/**
 * Return all entities with a given ID (should be unique)
 * @param {String} id - name of the desired ID
 * @returns {Promise} found entities
 */

const findEntity = function(id) {
    LOGGING.dir(id);
    return new Promise(function(resolve, reject) {
        const normalisedID = UTIL.normaliseID(id);
        if (normalisedID) {
            const queries = [
                retrieveRows(`SELECT * FROM people WHERE name LIKE ?;`, id),
                retrieveRows(`SELECT * FROM meetings WHERE name LIKE ?;`, id),
                retrieveRows(`SELECT * FROM locations WHERE name LIKE ?;`, id)
            ];
            const result = Promise.all(queries);
            result.then(function(rows) {
                const people = rows[0],
                    meetings = rows[1],
                    locations = rows[2];
                if (1 === people.length && 0 === meetings.length && 0 === locations.length)
                    resolve({type: exports.TYPE_PERSON, data: people[0]});
                else if (0 === people.length && 1 === meetings.length && 0 === locations.length)
                    resolve({type: exports.TYPE_MEETING, data: meetings[0]});
                else if (0 === people.length && 0 === meetings.length && 1 === locations.length)
                    resolve({type: exports.TYPE_LOCATION, data: locations[0]});
                else if (people.length + meetings.length + locations.length > 1)
                    reject('more than one entity');
                else
                    reject('foo');
            });
            result.catch(function(err) {
                reject(`“persistence.findEntity()” error: ${err}`);
            });
        } else
            reject('wrong');
    });
};

// Export stuff:
exports.setUp = setUp;
