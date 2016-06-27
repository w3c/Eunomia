/**
 * @file Set up Express, Handlebars and routes/views.
 * @author Antonio Olmo Titos <antonio@w3.org>
 * @exports lib/routing
 */

// External packages:
const EXPRESS = require('express'),
    EXPRESS_HANDLEBARS = require('express-handlebars'),
    BODY_PARSER = require('body-parser');

// Internal packages:
const ROUTES = require('./routes');

/**
 * Set up views using templates and Express Handlebars.
 *
 * @param {Object} app - the <a href="http://expressjs.com/">Express</a> application.
 */

const setUp = function(app) {

    const HANDLEBARS = EXPRESS_HANDLEBARS.create({defaultLayout: 'main'});

    app.set('title', 'Eunomia');
    app.set('case sensitive routing', true);
    app.set('strict routing', true);
    // app.set('views', process.cwd() + '/views');
    app.set('views', 'views');
    app.set('view cache', false);
    app.set('view engine', 'hbs');
    app.engine('hbs', HANDLEBARS.engine);
    app.use(EXPRESS.static('static'));
    app.use(BODY_PARSER.urlencoded({extended: true}));

    ROUTES.forEach(function(route) {
        app.get(route.path, function(req,res) {
            res.render(route.view, {title: route.title});
        });
    });

};

exports.setUp = setUp;
