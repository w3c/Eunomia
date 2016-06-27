/**
 * @file Eunomia's main file and entry point.
 * @author Antonio Olmo Titos <antonio@w3.org>
 * @exports server
 */

// External packages:
const EXPRESS = require('express');

// Internal packages:
const ROUTING = require('./lib/routing');

// Constants:
const APP = new EXPRESS();

ROUTING.setUp(APP);
APP.listen(3000);
