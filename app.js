var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var uuid=require('uuid');
var user = require('./routes/users');
var context = require('./routes/context');
var index = require('./routes/index');
var diary = require('./routes/diary');
var friend = require('./routes/friend');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/public', express.static(process.cwd() +'/public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  genid:function(req){
      return uuid.v1();
  },
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
  cookie:{maxAge:1000 * 60* 1} //過期時間
}));
// app.use(express.static(path.join(process.cwd(), 'public')));

// app.use('/', index);
app.use('/user', user);
app.use('/context', context);
app.use('/diary', diary);
app.use('/friend', friend);

// res.send('aaa'); HttpResponse !! node.js http Response; http Request;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
