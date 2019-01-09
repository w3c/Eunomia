/**
 * @file Eunomia's main file and entry point
 * @author Antonio Olmo Titos <a@olmo-titos.info>
 * @exports server
 */

// Configuration:
const SELF = require('./package'),
    CONFIG = require('./config');

// External packages:
const EXPRESS = require('express');

// Internal packages:
const LOGGING = require('./lib/logging'),
    AUTHENTICATION = require('./lib/authentication'),
    PERSISTENCE = require('./lib/persistence'),
    TIMEZONES = require('./lib/timezones'),
    ROUTING = require('./lib/routing');

// Constants:
const APP = new EXPRESS();

// Set up static assets:
APP.use(EXPRESS.static('static', {redirect: true}));

// Set up aspects:
LOGGING.setUp();
AUTHENTICATION.setUp(APP);
PERSISTENCE.setUp();
TIMEZONES.setUp();
ROUTING.setUp(APP);

// Listen for connections:
APP.listen(CONFIG.port);

LOGGING.info(`${SELF.name} ${SELF.version} set up${CONFIG.debug ? ' in debug mode' : ''} and listening on port ${CONFIG.port}`);
