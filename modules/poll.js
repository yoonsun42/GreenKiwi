/**
 * Created by jaejeon on 2016-08-05.
 */
var cheerio = require('cheerio');
var request = require('request');

module.exports = function(words, callback){
    var url = 'http://www.naver.com';
    request(url, function (error, response, html) {
        if (error) {throw error;}
        var $ = cheerio.load(html);
        var liList = $('#ranklist').children('dd').children('ol').children('li');
        for (var i = 0; i < liList.length; i++) {
            words.push($([liList[i]]).children('a').attr('title'));
        }
        callback(null, 0);
    });
};
