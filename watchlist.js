'use strict';

var Lists = new Mongo.Collection('lists');

if (Meteor.isClient) {
    Router.configure({
        layoutTemplate: 'layout'
    });

    Router.route('/', function () {
        this.render('home', {
            data: function () {
                return {title: 'Hello'}
            }
        });
    });

    Router.route('/u/:username', function () {
        var username = this.params.username;

        this.render('user', {
            data: function () {
                return Meteor.users.findOne({
                    username: username
                });
            }
        })
    });

    Meteor.subscribe('lists');
    Meteor.subscribe('users');

    Template.body.helpers({
        lists: function () {
            return Lists.find({});
        }
    });

    Template.body.events({
        'submit .new-list': function (event) {
            var title = event.target.title.value;

            Meteor.call('createList', title);

            event.target.title.value = '';

            return false;
        }
    });

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });
}

Meteor.methods({
    createList: function (title) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Lists.insert({
            title: title,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    deleteList: function (listId) {
        Lists.remove(listId);
    }
})

if (Meteor.isServer) {
    Meteor.startup(function () {

    });

    Meteor.publish('users', function () {
        return Meteor.users.find();
    });

    Meteor.publish('lists', function () {
        return Lists.find();
    });
}
