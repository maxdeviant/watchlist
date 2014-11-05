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
    var locals = {
        page: {
            title: 'Home'
        }
    };

    res.render('index', locals, function (err, data) {
        return res.send(minify(data, minifyOptions));
    });
});

module.exports = router;
