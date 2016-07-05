/**
 * @file Handle application logs
 * @author Antonio Olmo Titos <antonio@w3.org>
 * @exports lib/logging
 */

// Configuration:
const CONFIG = require('../config');

// External packages:
const WINSTON = require('winston');

// Variables:
var logger;

/**
 * Set up logging
 */

const setUp = function() {
    if (logger)
        logger.warn(`“logging.setUp()” called more than once`);
    else {
        const level = CONFIG.debug ? 'silly' : 'info';
        // @TODO: handle issues.
        logger = new WINSTON.Logger({
            transports: [
                new WINSTON.transports.Console({level: level, json: false}),
                new WINSTON.transports.File({level: level, json: false, filename: CONFIG.log})
            ]
        });
        logger.info(`logging to file “${CONFIG.log}” with level “${level}”`);
        // Export more stuff:
        exports.error = logger.error;
        exports.warn = logger.warn;
        exports.info = logger.info;
        exports.debug = logger.debug;
        exports.dir = dir;
    }
};

/**
 * Log the trace of an object
 * @param {Object} obj - the object to print
 * @param {String} msg - (optional) a message to prefix the trace
 */

const dir = function(obj, msg) {
    const prefix = msg ? `${msg}: ` : '';
    const trace = JSON.stringify(obj);
    logger.debug(`${prefix}${trace}`);
};

// Export stuff:
exports.setUp = setUp;
