
/*
 * GET home page.
 */
//var db = require('../common/db');

var config = require('../config/config');
var dbschema = require('../config/db');
var Player = dbschema.Player;

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.add = function (req, res, next) {
  var playername = req.body.playername || '';
  console.log('playername:'+playername);
  
  if (!playername) {
    return res.render('error.html', {message: '请输入玩家姓名'});
  }
 
  Player.find({name: playername}, function(err,docs){
  		if (docs.length>0){
  			return res.render('error.html', {message: '您已经约了一桌麻将了'});
  		}

  		var newplayer = new Player();	
 		console.log("start to find playername :"+playername);
  		newplayer.name = playername;
  		newplayer.date = new Date();
  		newplayer.save(function(err){
  				return next(err);
  			}
  		)
  		res.redirect('/');	
  	}
  );
};