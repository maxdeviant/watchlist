'use strict';

var config = require('../config');
var express = require('express');
var minify = require('html-minifier').minify;

var Movie = require('../models/movie');

var router = express.Router();

router.route('/m/:slug').get(function (req, res) {
    var locals = {
        page: {
            title: req.params.slug
        }
    };

    res.render('movies/details', locals, function (err, data) {
        return res.send(minify(data, config.minifyOptions));
    });
});

module.exports = router;
