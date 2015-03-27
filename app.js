'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/watchlist');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 24 * 60 * 60 * 1000
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var router = express.Router();

router.route('/')
    .get(function (req, res) {
        app.locals.page = {
            title: 'Home'
        };

        return res.render('index');
    });

app.use('/', router);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Watchlist server listening on port ' + server.address().port);
});
