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

