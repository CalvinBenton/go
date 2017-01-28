var Tour = require('./tours.js');

module.exports = function (app) {

    app.get('/tours', function(req, res) {
        Tour.findOne({}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });


};