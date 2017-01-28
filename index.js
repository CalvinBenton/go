var Tour = require('./tours.js');


var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3()

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hackcambridge-go',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
module.exports = function (app) {

    app.get('/tours', function(req, res) {
        Tour.find({}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    app.post('/tours', upload.single('audio'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);  
  res.send('Successfully uploaded ' + req.files.length + ' files!')

  


})

    app.get('/hotel', function(req, res) {
        app.get('http://partners.api.skyscanner.net/apiservices/hotels/autosuggest/v2/UK/EUR/en-GB/pari?apikey=prtl6749387986743898559646983194', function(req, res) {
        console.log(res)

    });
    });



};