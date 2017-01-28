'use strict';

var mongoose = require('mongoose');

var tourSchema = mongoose.Schema({
    name: String,
    weight: Number,
    age: Number
});

module.exports = mongoose.model('Tour', tourSchema);