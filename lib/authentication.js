/**
 * @file Handle (pseudo-)authentication
 * @author Antonio Olmo Titos <a@olmo-titos.info>
 * @exports lib/authentication
 */

// External packages:
const COOKIE_SESSION = require('cookie-session');

// Internal packages:
const LOGGING = require('./logging');

// Variables:
var ready = false;

/**
 * Set up authentication
 * @param {Object} app - the <a href="http://expressjs.com/">Express</a> application
 */

const setUp = function(app) {
    if (ready)
        LOGGING.warn(`“authentication.setUp()” called more than once`);
    else {
        app.set('trust proxy', 1);
        app.use(new COOKIE_SESSION({name: 'session', keys: ['key1', 'key2']}));
        ready = true;
        // Export more stuff:
        exports.isKnownUser = isKnownUser;
        exports.getUser = getUser;
        exports.setUser = setUser;
        exports.logOut = logOut;
    }
};

/**
 * Check if the user is authenticated
 * @param {Object} req - Express request
 * @returns {Boolean} whether the user is authenticated
 */

const isKnownUser = function(req) {
    return !!(req && req.session && req.session.user);
};

/**
 * Authenticate a user
 * @param {Object} req - Express request
 * @param {Object} user - user properties (a dictionary)
 */

const setUser = function(req, user) {
    LOGGING.info(`authenticating user ${user.name}`);
    if (req && req.session && req.session.user)
        LOGGING.warn(`called “authentication.setUser()” for a session that is already authenticated`);
    req.session.user = user;
};

/**
 * Get the user that is currently authenticated (if any)
 * @param {Object} req - Express request
 * @returns {Object} user properties (dictionary) of the user, if any; <code>undefined</code> otherwise
 */

const getUser = function(req) {
    LOGGING.dir(req.session.user);
    return req.session.user;
};

/**
 * De-authenticate a user (log them out)
 * @param {Object} req - Express request
 */

const logOut = function(req) {
    if (req && req.session && req.session.user)
        delete req.session.user;
};

// Export stuff:
exports.setUp = setUp;
