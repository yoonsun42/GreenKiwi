/**
 * Created by jaejeon on 2016-08-05.
 */
var urlencode = require('urlencode');
var https = require('https');
var mecab = require('mecab-ya');

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
        path: uri + '?query=' + urlencode('박유환') + '&display=10&start=1&sort=date',
        method: 'GET',
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };

    var req = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + res.headers);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {

            parser.parseString(chunk, function(err,result){
                if(err) console.log(err);
                else{
                    result.rss.channel[0].item.forEach(function(item){
                        mecab.pos(item.title, function(err, result){

                            console.log(result);
                        });
                    });
                }
            });
            //console.log('BODY: ' + chunk);
        });
    });
    req.end();

};