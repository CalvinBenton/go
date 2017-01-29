var Tour = require('./tours.js');


var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
const Speech = require('@google-cloud/speech')

var s3 = new aws.S3()

var fileName = Date.now().toString()+".mp3";
var url1 = "https://s3-us-west-2.amazonaws.com/hackcambridge-go/";
var url2 = url1.concat(fileName);
var ssurl = "http://partners.api.skyscanner.net/apiservices/hotels/liveprices/v2/UK/EUR/en-GB/27539733/2014-12-04/2014-12-10/2/1?apiKey=ha731738434387524676454915828415"

// [START speech_sync_recognize]
function syncRecognize (filename) {
  // Instantiates a client
  const speech = Speech();

  const config = {
    // Configure these settings based on the audio you're transcribing
    encoding: 'LINEAR16',
    sampleRate: 16000
  };

  // Detects speech in the audio file, e.g. "./resources/audio.raw"
  return speech.recognize(filename, config)
    .then((results) => {
      const transcription = results[0];
      console.log(`Transcription: ${transcription}`);
      return transcription;
    });
}
// [END speech_sync_recognize]


var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hackcambridge-go',
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, fileName)
    }
  })
})
module.exports = function (app) {

  function ssget(){
    app.get(ssurl, function(request, response) {
      console.log(response.results)
      return response.results;

    });
  }

  app.get('/tours', function(req, res) {
    Tour.find({}, function (err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  app.post('/tours', upload.single('audio'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(fileName)


  res.json({url: url2});
})

  app.post('/cat', function(req, res) {
    var obj = new Tour(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.json({success: true});
    });
  });

  app.get('/hotel', function(req, res) {
    var result = ssget();
    console.log(result);
  });


  app.get("/", function(req, res){
    Tour.find({}, function(err, data){
      if (!err) {
        res.json(data);
      }
    });
  });
};