'use strict';

var express = require('express');
var minify = require('html-minifier').minify;

var User = require('../models/user');

var minifyOptions = {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true
};

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

        res.render('users/profile', function (err, data) {
            return res.send(minify(data, minifyOptions));
        });
    });
});

router.route('/register').get(function (req, res) {
    res.render('register', function (err, data) {
        return res.send(minify(data, minifyOptions));
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
