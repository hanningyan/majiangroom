
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var connect = require('connect');
var render = require('connect-render');
var MySQlSessionStore = require("connect-mysql-session")(express);
var app = express();
app.use(connect.cookieParser());
app.use(connect.query());
app.use(connect.bodyParser());

//app.use(connect.session({secret: 'todo session secret'}));
//app.use(connect.csrf());
app.use(render({
    root: __dirname + '/views',    
    cache: true, // `false` for debug
    helpers: {
      sitename: '麻将馆',
  //    _csrf: function (req, res) {
//      	return req.csrfToken();
   	  //}
    }
  })
);




// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.cookieParser());
app.use(express.cookieSession({secret : 'blog.fens.me'}));
app.use(express.session({
    secret : 'majiangguan',
    store: new MySQlSessionStore(),
    cookie: { maxAge: 90000 } // expire session in 15 min or 900 seconds
}));


app.use(function(req, res, next){
	console.log(res.locals.error);
    res.locals.user = req.session.user;
    var err = res.locals.error;
    delete res.locals.error;
    if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
    res.locals.welcome="";
    next();
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.login);
app.post('/', routes.dologin);
app.post('/new',routes.add);
app.get('/users', user.list);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
