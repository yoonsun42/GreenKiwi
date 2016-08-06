/**
 * Created by jaejeon on 2016-08-06.
 */
var mongoose = require('mongoose');

var KiwiSchema = new mongoose.Schema({
   topic: String,
    keywords: [String],
    count: Number
});

module.exports = KiwiSchema;