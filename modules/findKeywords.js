/**
 * Created by jaejeon on 2016-08-05.
 */
var urlencode = require('urlencode');
var https = require('https');
var mecab = require('mecab-ya');
var wordMap = new Map();
var async = require('async');

module.exports = function(poll_result){

    var client_id = 'PON8429nB5fozBKQR0bi';
    var client_secret = 'XmvIFNtvxN';
    var host = 'openapi.naver.com';
    var port = 443;
    var uri = '/v1/search/news.xml';
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var replaceall = require('replaceall');

    var options = {
        host: host,
        port: port,
        path: uri + '?query=' + urlencode('류승우') + '&display=10&start=1&sort=sim',
        method: 'GET',
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };


    var req = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + res.headers);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            parser.parseString(chunk, function(err,result){
                var newsList = result.rss.channel[0].item;
                var newsTitle = "1";
                var newsDesc = "2";
                for (var i = 0; i < newsList.length; i++) {
                    newsTitle = newsTitle.concat(newsList[i].title[0]);
                    newsDesc = newsDesc.concat(newsList[i].description[0]);
                }
                console.log(newsTitle);
                    var sortedMap = [];
                    async.series([
                        function(callback) {
                            mecab.nouns(newsTitle, function (err, result) {
                                for (var j = 0; j < result.length; j++) {
                                    if (wordMap[result[j]] == undefined) {
                                        wordMap[result[j]] = 2;
                                    }
                                    else {
                                        wordMap[result[j]] += 2;
                                    }
                                }
                                mecab.nouns(newsDesc, function (err, result) {
                                    for (var j = 0; j < result.length; j++) {
                                        if (wordMap[result[j]] == undefined) {
                                            wordMap[result[j]] = 1;
                                        }
                                        else {
                                            wordMap[result[j]] += 1;
                                        }
                                    }

                                    for (var value in wordMap) {
                                        sortedMap.push([value, wordMap[value]]);
                                        sortedMap.sort(
                                            function (a, b) {
                                                return b[1] - a[1];
                                            }
                                        )
                                    }
                                    console.log(sortedMap);
                                    callback(null, 1);
                                });
                            });

                        }], function(err,result) {
                        }
                    );
            });
        });
    });
    req.end();

};