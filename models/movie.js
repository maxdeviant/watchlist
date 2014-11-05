'use strict';

var mongoose = require('mongoose');
var troop = require('mongoose-troop');

var MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number
    }
});

MovieSchema.plugin(troop.slugify, {
    override: true
});

MovieSchema.plugin(troop.timestamp, {
    createdPath: 'created_on',
    modifiedPath: 'last_updated',
    useVirtual: false
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
