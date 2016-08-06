/**
 * Created by jaejeon on 2016-08-06.
 */
var mongoose = require('mongoose');

var KiwiSchema = new mongoose.Schema({
   date : String, // "yyyy/mm/dd"
   topics : [{
       topic : String,
       count : Number,
       keywords : [{word : String}],
       links : [{link : String}]
   }]
});

module.exports = KiwiSchema;