'use strict';

var config = require('../config');
var express = require('express');
var minify = require('html-minifier').minify;

var List = require('../models/list');
var User = require('../models/user');

var router = express.Router();

router.route('/lists/new').get(function (req, res) {
    var locals = {
        page: {
            title: 'Add List'
        }
    };

    res.render('lists/create', locals, function (err, data) {
        return res.send(minify(data, config.minifyOptions));
    });
}).post(function (req, res) {
    User.findOne({
        username: req.session.username
    }, function (err, user) {
        if (err) {

        }

        if (user === null) {

        }

        var list = new List();

        list._user = user._id;
        list.title = req.body.title;

        list.save(function (err) {
            if (err) {
                throw err;
            }

            return res.redirect(config.url.users + user.username + config.url.lists + list.slug);
        })
    });


});

module.exports = router;
