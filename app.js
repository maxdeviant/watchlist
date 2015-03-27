'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var User = require('./models/user');

mongoose.connect('mongodb://localhost/watchlist');

var app = express();

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

        return res.render('login');
    });

app.use('/', router);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Watchlist server listening on port ' + server.address().port);
});
