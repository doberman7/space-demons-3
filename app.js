require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const passport = require('./config/passport')
const log = require('chalk-animation');
const flash = require('connect-flash');


mongoose
  // .connect('mongodb://localhost/space-demons-3', {useNewUrlParser: true, useUnifiedTopology: true })
  .connect(process.env.DB || 'mongodb://localhost/space-demons-3', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(x => {
    log.rainbow(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());
require('./config/session')(app)
// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

const authRoutes = require('./routes/authRoutes');
const challengeRoutes = require('./routes/challengeRoutes1');
const gameRoutes = require('./routes/gameRoutes');

// default value for title local
app.locals.title = 'Space Challenge';
//rutas
//const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);
//rutas games
//const gameRoutes = require('./routes/gameRoutes');
app.use('/game', gameRoutes);
//ERROR of deploy Error: Cannot find module './routes/challengeRoutes'
// const challengeRoutes = require('./routes/challengeRoutes');
app.use('/challenge', challengeRoutes);


module.exports = app;

// app.listen(process.env.PORT)
