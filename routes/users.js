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
    res.render('users/profile', function (err, data) {
        return res.send(minify(data, minifyOptions));
    });
});

module.exports = router;
