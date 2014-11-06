'use strict';

var config = require('../config');
var express = require('express');
var minify = require('html-minifier').minify;

var router = express.Router();

router.route('/').get(function (req, res) {
    var locals = {
        page: {
            title: 'Home'
        }
    };

    res.render('index', locals, function (err, data) {
        return res.send(minify(data, config.minifyOptions));
    });
});

module.exports = router;
