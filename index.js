var Tour = require('./tours.js');

const Speech = require('@google-cloud/speech');

function syncRecognize (filename) {
  const speech = Speech();

  const config = {
    encoding: 'LINEAR16',
    sampleRate: 16000
  };

  return speech.recognize(filename, config)
    .then((results) => {
      const transcription = results[0];
      console.log(`Transcription: ${transcription}`);
      return transcription;
    });
}

module.exports = function (app) {

    app.get('/tours', function(req, res) {
        Tour.find({}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    app.post('/tours', function(req, res) {
        console.log(req.body);
    });

    app.get('/hotel', function(req, res) {
        app.get('http://partners.api.skyscanner.net/apiservices/hotels/autosuggest/v2/UK/EUR/en-GB/pari?apikey=prtl6749387986743898559646983194', function(req, res) {
        console.log(res)

    });
    });



};