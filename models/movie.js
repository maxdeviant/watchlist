'use strict';

var mongoose = require('mongoose');
var troop = require('mongoose-troop');

var MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number
    }
});

MovieSchema.plugin(troop.slugify, {
    override: true
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
