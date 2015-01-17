'use strict';

var Users = new Mongo.Collection('users');

if (Meteor.isClient) {
    Template.body.helpers({
        users: function () {
            return Users.find({});
        }
    });

    Template.body.events({
        'submit .new-user': function (event) {
            var username = event.target.username.value;

            Users.insert({
                username: username,
                createdAt: new Date()
            });

            event.target.username.value = '';

            return false;
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
