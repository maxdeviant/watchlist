'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var session = require('express-session');

var jwtauth = require('./lib/jwt-auth');

var mongoose = require('mongoose');

var User = require('./models/user');

mongoose.connect('mongodb://localhost/watchlist');

var app = express();

app.set('jwtTokenSecret', 'YWxzamZrc2FkaGZsc2pkZmxhc2RqZnNkZmFzZGY=');

app.use(session({
    secret: 'SUPER_SECRET_KEY',
    saveUninitialized: true,
    resave: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 24 * 60 * 60 * 1000
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var router = express.Router();

router.route('/')
    .get(function (req, res) {
        app.locals.page = {
            title: 'Home'
        };

        return res.render('index');
    });

router.route('/register')
    .get(function (req, res) {
        app.locals.page = {
            title: 'Register'
        };

        return res.render('register');
    })
    .post(function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err || user !== null) {
                app.locals.error = 'Username is not available.';

                return res.render('register');
            }

            var user = new User();

            user.username = req.body.username;
            user.password = req.body.password;
            user.firstName = req.body.firstname;
            user.lastName = req.body.lastname;

            user.save(function (err) {
                if (err) {
                    app.locals.error = 'An error occurred during registration.';

                    return res.render('register');
                }

                return res.redirect('/');
            });
        });
    });

router.route('/login')
    .get(function (req, res) {
        app.locals.page = {
            title: 'Log In'
        };

        app.locals.error = '';

        return res.render('login');
    })
    .post(function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                app.locals.error = 'An error occurred during login.';

                return res.render('login');
            }

            if (user === null) {
                app.locals.error = 'Invalid username and/or password.';

                return res.render('login');
            }

            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch) {
                    var expires = new Date();
                    expires.setDate(expires.getDate() + 7);

                    var token = jwt.encode({
                        iss: user._id,
                        username: user.username,
                        expires: expires
                    }, app.get('jwtTokenSecret'));

                    req.session.token = token;

                    return res.redirect('/');
                }

                app.locals.error = 'Invalid username and/or password.';

                return res.render('login');
            });
        });
    });

router.route('/logout')
    .get(function (req, res) {
        req.session.destroy(function (err) {
            return res.redirect('login');
        });
    });

router.route('/u/:username')
    .get([jwtauth], function (req, res) {
        User.findOne({
            username: req.params.username
        }, function (err, user) {
            if (err || user === null) {
                app.locals.page = {
                    title: '404'
                };

                return res.render('errors/404')
            }

            app.locals.page = {
                title: user.username
            };

            app.locals.user = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            };

            return res.render('user.ejs');
        });
    });

app.use('/', router);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Watchlist server listening on port ' + server.address().port);
});
