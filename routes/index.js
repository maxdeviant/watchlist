'use strict';

var express = require('express');
var minify = require('html-minifier').minify;

var minifyOptions = {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true
};

var router = express.Router();

router.route('/').get(function (req, res) {
    res.render('index', function (err, data) {
        return res.send(minify(data, minifyOptions));
    });
});

router.route('/register').get(function (req, res) {
    res.render('register', function (err, data) {
        return res.send(minify(data, minifyOptions));
    });
}).post(function (req, res) {
    
});

module.exports = router;
