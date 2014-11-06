'use strict';

var config = require('../config');
var express = require('express');
var minify = require('html-minifier').minify;

var User = require('../models/user');
var List = require('../models/list');

var router = express.Router();

router.route('/u/:username').get(function (req, res) {
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            throw err;
        }

        if (user === null) {
            var err = {
                message: 'User not found',
                error: {
                    status: 404,
                    stack: ''
                }
            };

            return res.status(404).render('error', err);
        }

        List.find({
            _user: user._id
        }, function (err, lists) {
            if (err) {
                throw err;
            }

            var locals = {
                page: {
                    title: user.username
                },
                user: user,
                lists: lists
            };

            res.render('users/profile', locals, function (err, data) {
                return res.send(minify(data, config.minifyOptions));
            });
        });
    });
});

router.route('/login').get(function (req, res) {
    var locals = {
        page: {
            title: 'Login'
        }
    };

    res.render('login', locals, function (err, data) {
        return res.send(minify(data, config.minifyOptions));
    });
}).post(function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            throw err;
        }

        if (user === null) {
            return;
        }

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
                throw err;
            }

            if (isMatch) {
                req.session.username = user.username;

                return res.redirect('/u/' + user.username);
            }

            return res.redirect('/login');
        });
    });
});

router.route('/register').get(function (req, res) {
    var locals = {
        page: {
            title: 'Register'
        }
    };

    res.render('register', locals, function (err, data) {
        return res.send(minify(data, config.minifyOptions));
    });
}).post(function (req, res) {
    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function (err) {
        if (err) {
            throw err;
        }

        return res.redirect('/u/' + user.username);
    })
});

module.exports = router;
