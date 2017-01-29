'use strict';

var mongoose = require('mongoose');

var tourSchema = mongoose.Schema({
    longi: Number,
    lati: Number,
    audioUrl: String,
    createdAt: Number,
    rating: Number,
    noOfRatings: Number,
    audioUrlSpa: {type: String, default: null},
    audioUrlEng: {type: String, default: null},
    audioUrlFre: {type: String, default: null}
});

module.exports = mongoose.model('Tour', tourSchema);