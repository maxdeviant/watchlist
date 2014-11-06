'use strict';

var mongoose = require('mongoose');
var troop = require('mongoose-troop');

var ListSchema = new mongoose.Schema({
    _user: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    }
});

ListSchema.plugin(troop.slugify, {
    override: true
});

ListSchema.plugin(troop.timestamp, {
    createdPath: 'created_on',
    modifiedPath: 'last_updated',
    useVirtual: false
});

var List = mongoose.model('List', ListSchema);

module.exports = List;
