'use strict';

var mongoose = require('mongoose');

var tourSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Tour', tourSchema);