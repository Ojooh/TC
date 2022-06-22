const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


const routes = require('./routes/index');
const Authenticator = require('./helpers/auth');
const responder = require('./middleware/responder');
const allowlist = ['http://localhost:3000'];

var corsOptionsDelegate = function (req, callback) {
  console.log(req.header('Origin'));
  var corsOptions;
  console.log(req.header('Origin'))
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true }
  } else {
    // corsOptions = { origin: false, credentials: true }
    corsOptions = { origin: true, credentials: true }
  }
  console.log(corsOptions);
  callback(null, corsOptions)
};

corsOptions = { origin: true, credentials: true }



const app = express();
const auth = new Authenticator();

app.use(cors(corsOptionsDelegate));
app.use(responder);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/TC/api/v1', routes);

passport.use(new LocalStrategy(
  async function(username, password, done) {
    await auth.authenticateUser(username, password, done)
  }
));

passport.serializeUser((user, done) => {  done(null, user.email)})

passport.deserializeUser((id, done) => {auth.getUser(id, done)})

// catch 404 and forward to error handler
app.use(function (req, res) {
  let response = {};
  response.status = 'error';
  response.code = 404;
  response.msg = 'Route does not exist';
  res.json(response);
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
