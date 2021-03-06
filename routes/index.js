
/*
 * GET home page.
 */
//var db = require('../common/db');

var config = require('../config/config');
var dbschema = require('../config/db');
var Player = dbschema.Player;
var User = dbschema.User;

exports.main = function(req, res){
	console.log("go to main")
    console.log(res.locals.user);

    if(!res.locals.user){
        res.locals.error='请先登录';
        res.redirect('/');
    }else{
        res.render('index.html');
    }
};

exports.login = function(req,res){
	res.render('login.html');
}

exports.dologin = function(req, res){
	var username = req.body.username;
    var pwd = req.body.password;
	
	//console.log(username+" start to login");
	User.find({username: username}, function(err,docs){
       
  		if (docs.length==0 ){
  			console.log("verify success!");
  			req.session.error='用户名或密码不正确';
            res.redirect('/');
  		}
  		else{
  			console.log("verify failed!");
           	req.session.user = docs[0].name;
            welcome = docs[0].nickname;         
            res.redirect('/main');  			         
        }	        
  	 })	
}

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