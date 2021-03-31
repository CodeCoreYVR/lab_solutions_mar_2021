const express = require('express');
const logger = require('morgan');
const methodOverride = require("method-override");


// REQUIRE ROUTE FILES
const welcomeRouter = require("./routes/welcome");
const notesRouter = require("./routes/notes");

// CREATE APP
const app = express();

// CHOOSE TEMPLATING ENGINE
app.set('view engine', 'ejs');

// SETUP MIDDLEWARE

//Own middleware. must be before our first route. will replace with third party morgan middleware
//Unlike app.get, app.use will work with any HTTP verb
// app.use((req, res, next) => {
//   console.log(`📝 ${request.method} – ${request.path} – ${new Date().toString()}`);
//   next();
// });

//Using morgan middleware
//this will log the date in clf format in cl when refreshing browser
//see morgan docs https://github.com/expressjs/morgan
app.use(logger(':date[clf]'));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

// creates a route without route files
// app.get('/hello-world', function (req, res) {
//   res.send('Hello, World!');
// });

// Method Override
app.use(
  // Without this, we cannot accept DELETE or PATCH or PUT requests from
  // the browser!
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      // This modifies the request object
      // it changes it from a POST request
      // to be whatever the value for _method was
      // within the form that was just submitted
      return method;
    }
  })
);

// USE ROUTERS FROM ROUTE FILES
app.use("/", welcomeRouter);
app.use("/notes", notesRouter);

// START RUNNING SERVER
const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listening on http://${DOMAIN}:${PORT}`);
});

/*
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
*/
