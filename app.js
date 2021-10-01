/* Daniel Ayoub
 * 301 146 330
 * Due October 2nd 2021
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routing variables which require the new files in routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRoute = require('./routes/about');
var projectRoute = require('./routes/projects')
var servicesRoute = require('./routes/services')
var contactRoute = require('./routes/contact')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// when we refer to anything in public no need to reference it because of this
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// add the routes to pages
// products, about me, services, etc. 
app.use('./about', aboutRoute);
app.use('./projects', projectRoute);
app.use('./services', servicesRoute);
app.use('./contact', contactRoute);

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
