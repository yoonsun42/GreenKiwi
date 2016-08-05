var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var arr = [['윤서니', '1', ['재저니 바보', '흑흑', '귀차나아앙']], ['재저니', '2', ['재저니 뷰뷰 바보', '흑흑']], ['해커톤', '3', ['재저니 바보', '흑흑']]];
  //var arr = [['윤서니', '1', ['재저니 바보', '흑흑']], ['재저니', '2', ['재저니 바보', '흑흑']], ['해커톤', '3', ['재저니 바보', '흑흑']], ['밤샐꺼얌', '4'], ['헤헤', '5'], ['치킨치킨', '6'], ['재저니랑 윤선이', '7'], ['테스트하는구', '8'], ['뭐', '9'], ['또니잉', '10']];
  res.render('index', { title: 'GreenKiwi', arr : arr });
});

module.exports = router;
