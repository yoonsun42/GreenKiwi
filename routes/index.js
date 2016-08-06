var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var KiwiSchema = require('../models/Kiwi.js');
var Kiwi = mongoose.model('Kiwi', KiwiSchema);
var TreeSchema = require('../models/Tree.js');
var Tree = mongoose.model('Tree', TreeSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  //arr는 [ [ TOPIC, RANK, [ WORDS ] ] ] 로 구성
  var arr = [['윤서니', '01', ['재저니', '흑흑', '귀차나']], ['재저니', '02', ['뷰뷰', '흑흑']], ['해커톤', '03', ['바보', '흑흑']]];
  //var arr = [['윤서니', '1', ['재저니 바보', '흑흑']], ['재저니', '2', ['재저니 바보', '흑흑']], ['해커톤', '3', ['재저니 바보', '흑흑']], ['밤샐꺼얌', '4'], ['헤헤', '5'], ['치킨치킨', '6'], ['재저니랑 윤선이', '7'], ['테스트하는구', '8'], ['뭐', '9'], ['또니잉', '10']];
  res.render('index', { title: 'GreenKiwi', arr : arr });
});

router.get('/:page', function(req,res,next){
  res.render(req.params.page);
});

router.get('/hello', function(req,res,next){
  res.render('hello');
});

module.exports = router;
