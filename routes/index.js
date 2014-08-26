
/*
 * GET home page.
 */
var db = require('mongoose');
var config = require('../config/config');
db.connect(config.db);

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.add = function (req, res, next) {
  var playername = req.body.playername || '';
  console.log('playername:'+playername);
  if (!playername) {
    return res.render('error.html', {message: '请输入玩家姓名'});
  }
  
  db.majiang.findItems({name:playername}, { sort: {_id: 1, finished: 1}}, function (err, rows) {
    if (err) {
      return next(err);
    }
    if (rows.count>0){
    	return res.render('error.html', {message: '您已经约了一桌麻将了'});
    }
    db.majiang.save({name: playername, post_date: new Date()}, function (err, row) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });//save  
  });//find
  
};