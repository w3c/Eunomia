/**
 * @file Set up Express, Handlebars and routes/views
 * @author Antonio Olmo Titos <antonio@w3.org>
 * @exports lib/routing
 */

// Configuration:
const SELF = require('../package'),
    CONFIG = require('../config'),
    ROUTES = require('./routes');

// External packages:
const EXPRESS_HANDLEBARS = require('express-handlebars'),
    BODY_PARSER = require('body-parser');

// Internal packages:
const AUTHENTICATION = require('./authentication'),
    PERSISTENCE = require('./persistence'),
    TIMEZONES = require('./timezones');

/**
 * Generic handler for errors
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {String} message - (optional) additional error message to display
 */

const four_oh_four = function(req, res, message) {
    const context = buildContext(req, {title: 'uh?', message: message});
    res.render('404', context);
};

/**
 * Context baseline for Handlebars rendering
 * @param {Object} req - (optional) Express request
 * @param {Object} props - (optional) data (keys/properties) to add to the context
 * @returns {Object} a context to use in rendering
 */

const buildContext = function(req, props) {
    const result = {
        version: SELF.version,
        debug: CONFIG.debug,
    };
    if (req) {
        result.known = AUTHENTICATION.isKnownUser(req);
        if (result.known)
            result.user = AUTHENTICATION.getUser(req);
    }
    for (var i in props)
        result[i] = props[i];
    return result;
};

/**
 * Set up views using templates and Express Handlebars
 * @param {Object} app - the <a href="http://expressjs.com/">Express</a> application
 */

const setUp = function(app) {

    const HANDLEBARS = EXPRESS_HANDLEBARS.create({defaultLayout: 'main'});

    app.set('title', 'Eunomia');
    app.set('case sensitive routing', true);
    app.set('strict routing', false);
    app.set('view cache', !CONFIG.debug);
    app.set('view engine', 'hbs');
    app.engine('hbs', HANDLEBARS.engine);
    app.use(BODY_PARSER.urlencoded({extended: true}));

    // Standard pages:
    for (var i in ROUTES) {
        const route = ROUTES[i];
        app.get(i, function(req, res) {
            const context = buildContext(req, {title: route.title, special: route.special});
            if (route.list) {
                const list = PERSISTENCE.listEntities(route.list);
                list.then(function(rows) {
                    context.list = rows;
                    res.render(route.view, context);
                });
                list.catch(function() {
                    // @TODO: handle errors here.
                });
            } else if (route.timezones) {
                context.list = TIMEZONES.tzContinents;
                res.render(route.view, context);
            } else
                res.render(route.view, context);
        });
        if (route.post)
            if ('login' === route.post)
                app.post(i, function(req, res) {
                    const user = PERSISTENCE.findEntity(req.body.name);
                    user.then(function(data) {
                        if ('string' === typeof data) {
                            // @TODO: handle this error.
                            res.status(401).end();
                        } else if (PERSISTENCE.TYPE_PERSON === data.type) {
                            AUTHENTICATION.setUser(req, data.data);
                            // res.send(`/${data.data.name}`);
                            res.send('/');
                        } else {
                            // @TODO: handle this error.
                            res.status(401).end();
                        }
                    });
                    user.catch(function() {
                        // @TODO: handle this error.
                        res.status(401).end();
                    });
                });
            else if ('signup' === route.post)
                app.post(i, function(req, res) {
                    const newUser = req.body;
                    if (TIMEZONES.timezoneExists(newUser.name))
                        res.send('user ID not valid');
                    else {
                        // if (PEOPLE.createNewUser(newUser))
                        //     LOGGING.debug('ok');
                    }
                    const context = buildContext(req, {title: route.title});
                    res.render(route.view, context);
                });
    }

    // Standard favicon:
    app.get('favicon.ico', function(req, res) {
        res.redirect('https://www.w3.org/2015/labs/favicon.ico');
    });

    // Timezone pages:
    app.get('/:continent/:city', function(req, res) {
        const p1 = req.params.continent,
            p2 = req.params.city,
            a1 = p1.replace(/_/g, '&nbsp;'),
            a2 = p2.replace(/_/g, '&nbsp;'),
            tz = `${p1}/${p2}`,
            title = `${a1}&nbsp;/&nbsp;${a2}`;
        var found = TIMEZONES.tzContinents[p1];
        if (found)
            found = found[p2];
        else
            found = undefined;
        if (found) {
            const context = buildContext(req, {title: title, tz: tz});
            TIMEZONES.processTimezone(context);
            res.render('timezone', context);
        } else
            four_oh_four(req, res, 'TZ not found');
    });

    // /me:
    app.get('/me', function(req, res) {
        if (AUTHENTICATION.isKnownUser(req)) {
            const id = AUTHENTICATION.getUser(req).name;
            res.redirect(`/${id}`);
        } else
            res.redirect('/login');
    });

    // /logout:
    app.get('/logout', function(req, res) {
        if (AUTHENTICATION.isKnownUser(req))
            AUTHENTICATION.logOut(req);
        res.redirect('/');
    });

    // Entity pages:
    app.get('/:id', function(req, res) {
        const context = buildContext(req);
        const result = PERSISTENCE.findEntity(req.params.id);
        result.then(function(data) {
            if ('string' === typeof data)
                four_oh_four(req, res, data);
            else {
                context.title = data.data.name;
                context.item = data.data;
                if (PERSISTENCE.TYPE_PERSON === data.type)
                    res.render('person', context);
                else if (PERSISTENCE.TYPE_MEETING === data.type)
                    res.render('meeting', context);
                else if (PERSISTENCE.TYPE_LOCATION === data.type)
                    res.render('location', context);
                else
                    res.send(data);
            }
        });
        result.catch(function() {
            four_oh_four(req, res);
        });
    });

};

// Export stuff:
exports.setUp = setUp;
