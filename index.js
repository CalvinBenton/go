var Tour = require('./tours.js');

module.exports = function (app) {

    app.get('/tours/:id', function(req, res) {
        Tour.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });


};