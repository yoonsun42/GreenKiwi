/**
 * Created by jaejeon on 2016-08-05.
 */

var cheerio = require('cheerio');
var request = require('request');
var async = require('async');




module.exports = function(words){
    var url = 'http://www.naver.com';
    var temp = [];

    async.series([
       function(callback){
            request(url, function(error, response, html){
                if (error) {throw error};
                var $ = cheerio.load(html);
                var liList = $('#ranklist').children('dd').children('ol').children('li');
                for (var i = 0; i < liList.length; i++) {
                    words.push($([liList[i]]).children('a').attr('title'));
                }
                callback(null, 1)
            });
       }
    ], function(err, result){
        words = temp;
    });
    /*
    request(url, function(error, response, html){


        async.series([
            function(callback){

            }
            ],
            function(err, result){
                console.log(words);
                return words;
            });
    });
    */
};
