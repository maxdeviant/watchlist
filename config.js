'use strict';

var config = {
    minifyOptions: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true
    },
    url: {
        users: '/u/',
        lists: '/l/'
    }
};

module.exports = config;