var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var asyncPolling = require('async-polling');
var poll = require('./modules/poll.js');
var async = require('async');
var mecab = require('mecab-ya');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var words = [];
var polling = asyncPolling(function (end){
  async.series([
     function(callback){
        words = [];
        poll(words, callback);
     }
  ], function(err, result){
    //console.log(words);
    end(null, '#' + result + ' wait a second...');
  });
}, 3000);

polling.run();



var text = '아버지가방에들어가신다';

mecab.pos(text, function (err, result) {
  console.log(result+'?');
  /*
   [ [ '아버지', 'NNG' ],
   [ '가', 'JKS' ],
   [ '방', 'NNG' ],
   [ '에', 'JKB' ],
   [ '들어가', 'VV' ],
   [ '신다', 'EP+EC' ] ]
   */
});

mecab.morphs(text, function (err, result) {
  console.log(result+'!');
  /*
   [ '아버지', '가', '방', '에', '들어가', '신다' ]
   */
});

mecab.nouns(text, function (err, result) {
  console.log(result);
  /*
   [ '아버지', '방' ]
   */
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
