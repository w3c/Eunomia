/**
 * @file Eunomia's client-side logic
 * @author Antonio Olmo Titos <a@olmo-titos.info>
 * @exports static/js/behaviour
 */

/* jshint node: true */
/* globals requirejs: false, document: false, window: false, EUNOMIA_DEBUG: false */

'use strict';

/**
 * Tweak the behaviour of the login page
 * @param {Object} $ - the <a href="https://jquery.com/">jQuery</a> object
 */

const processLoginPage = function($) {
    $('[data-id]').click(function() {
        const gate = $.post('#', {name: $(this).data('id')}, function(data) {
            window.location.href = data;
        });
        gate.fail(function(err) {
            console.dir(err); // eslint-disable-line no-console
        });
    });
};

/**
 * Find invisible elements containing Markdown, render it, and show the element
 * @param {Object} $ - the <a href="https://jquery.com/">jQuery</a> object
 * @param {Object} md - the <a href="https://github.com/markdown-it/markdown-it">markdown-it</a> object
 */

const processMD = function($, md) {
    $('.md').each(function() {
        const content = this.textContent;
        console.log(content); // eslint-disable-line no-console
        $(this).html(md.render(content));
        $(this).removeClass('missing');
    });
};

/**
 * Set up the page
 * @param {Object} $ - the <a href="https://jquery.com/">jQuery</a> object
 * @param {Object} markdownit - the <a href="https://github.com/markdown-it/markdown-it">markdown-it</a> object
 */

const init = function($, foo, markdownit) {
    $(document).ready(function() {
        const md = markdownit(),
            html = $('html');
        html.removeClass('no-js').addClass('js');
        processLoginPage($);
        processMD($, md);
        $('table.tablesorter').tablesorter();
    });
};

// Set up RequireJS:
requirejs.config({
    paths: {
        // "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3".
        jquery: 'https://code.jquery.com/jquery-2.2.4' + (EUNOMIA_DEBUG ? '' : '.min'),
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap' + (EUNOMIA_DEBUG ? '' : '.min'),
        'markdown-it': 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it' + (EUNOMIA_DEBUG ? '' : '.min'),
        'tablesorter': 'https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.28.14/js/jquery.tablesorter' + (EUNOMIA_DEBUG ? '' : '.min')
    },
    shim: {
        'bootstrap': ['jquery'],
        'tablesorter': ['jquery']
    }
});

// Load dependencies asynchronously via RequireJS:
requirejs(['jquery', 'bootstrap', 'markdown-it', 'tablesorter'], init);
