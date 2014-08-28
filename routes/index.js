
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
  			console.log("verify password failed");
  			res.locals.error="用户名或密码错误";
  			 			  		
  		}
  		else{
  			console.log("verify password success");  		  
  		    res.locals.user = docs[0].name;
         	res.locals.welcome = "欢迎您"+docs[0].name;         	
        }	
        res.redirect("/")
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