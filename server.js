// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket and upload something into it
var bucketName = 'node-sdk-sample-' + uuid.v4();
var keyName = 'hello_world.txt';

var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session');
var routes = require(process.cwd() + '/index.js');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
app.set('port', (process.env.PORT || 3000));

app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://calvin:calvin@ds035059.mlab.com:35059/heroku_nddr0s0s');
var db = mongoose.connection;
mongoose.Promise = global.Promise;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    routes(app);
    // all other routes are handled by Angular

    app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port '+app.get('port'));
    });
});

/*
s3.createBucket({Bucket: bucketName}, function() {
  var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
});*/
