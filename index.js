var Tour = require('./tours.js');

module.exports = function (app) {

    app.get('/tours', function(req, res) {
        Tour.find({}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    app.post('/tours', function(req, res) {
        var obj = new Tour(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

};