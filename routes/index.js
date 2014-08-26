
/*
 * GET home page.
 */
//var db = require('../common/db');

var config = require('../config/config');
var mongoose = require('mongoose');
var db       = mongoose.createConnection(config.db);

var Schema = mongoose.Schema , ObjectId = Schema.ObjectId;
var PlayerSchema = new Schema({
    name  :  { type: String, default: 'null' }
  , date  :  { type: Date, default: Date.now }
});


db.on('error', function(error) {
    console.log(error);
});


exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.add = function (req, res, next) {
  var playername = req.body.playername || '';
  console.log('playername:'+playername);
  
  if (!playername) {
    return res.render('error.html', {message: '请输入玩家姓名'});
  }
  
  var Player = mongoose.model('player',PlayerSchema);
  var newplayer = new Player();
  Player	.find({name: playername}, function(err,docs){
  		if (docs.count>0){
  			return res.render('error.html', {message: '您已经约了一桌麻将了'});
  		}
  		console.log("playername :"+playername+" can be used!");
  		newplayer.name = playername;
  		newplayer.post_date = new Date();
  		newplayer.save(function(err){
  				return next(err);
  			}
  		)
  		res.redirect('/');
  	}
  );
/* 
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
*/  
};