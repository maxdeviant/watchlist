'use strict';

var express = require('express');
var minify = require('html-minifier').minify;

var Movie = require('../models/movie');

var minifyOptions = {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true
};

var router = express.Router();

router.route('/m/:slug').get(function (req, res) {
    res.render('movies/details', function (err, data) {
        return res.send(minify(data, minifyOptions));
    });
});

module.exports = router;
