/**
 * @file Eunomia's client-side logic.
 * @author Antonio Olmo Titos <antonio@w3.org>
 * @exports static/js/behaviour
 */

 /* jshint node: true */
 /* globals requirejs: false, document: false */

'use strict';

/**
 * Set up the page.
 *
 * @param {Object} $ - the <a href="https://jquery.com/">jQuery</a> object.
 */

const init = function($) {

    $('html').removeClass('no-js').addClass('js');

    $(document).ready(function() {
    });

};

// Set up RequireJS:
requirejs.config({
    paths: {
        // "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3".
        // @TODO: switch to minified jQuery in production:
        // jquery: 'https://code.jquery.com/jquery-2.2.4.min',
        jquery: 'https://code.jquery.com/jquery-2.2.4',
        // @TODO: switch to minified Bootstrap JS in production:
        // bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap',
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

// Load dependencies asynchronously via RequireJS:
requirejs(['jquery', 'bootstrap'], init);
