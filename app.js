require('module-alias/register');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");

//support for cors 
var cors = require('cors')

//Import body parser 
var bodyParser = require('body-parser');

//env
const dotenv = require('dotenv');
dotenv.config();


//routes

// const indexRouter = require('@routes/index');
const UserRouter = require('@routes/users.route');
const AuthRouter = require('@routes/auth.route');
const AppointmentRouter = require("@routes/appointments.route");
const DrugRouter = require("@routes/drugs.route");
const MedicationRouter = require("@routes/medications.route");
const SpecialistRouter = require("@routes/specialists.route");
const HealthTipRouter = require("@routes/healthTips.route");

//seeders
const AppointmentSeederRouter = require('@routes/seeders/appointments.route');
const SpecialistSeederRouter = require('@routes/seeders/specialists.route');
const MedicationSeederRouter = require('@routes/seeders/medications.route');
const userSeederRouter = require('@routes/seeders/users.route');
const healthTipSeederRouter = require('@routes/seeders/healthTip.route');
const drugSeederRouter = require('@routes/seeders/drug.route');

var app = express();

var dbConnect = require( './config/db.config' );
dbConnect.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug') ;

app.use(logger('dev'));

//use cors
app.use(cors())

//use body-parser
app.use( bodyParser.json( {limit: '50mb', extended: true}) );
app.use( bodyParser.urlencoded( {limit: '50mb', extended: true, parameterLimit: 50000}) );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

// app.use('/', indexRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/drug', DrugRouter);
app.use('/api/v1/appointment', AppointmentRouter);
app.use('/api/v1/healthtip', HealthTipRouter);
app.use('/api/v1/medication', MedicationRouter);
app.use('/api/v1/specialist', SpecialistRouter);
app.use('/api/v1/auth', AuthRouter);

//seeders
app.use('/api/v1/seeder/appointment', AppointmentSeederRouter );
app.use('/api/v1/seeder/specialist', SpecialistSeederRouter  );
app.use('/api/v1/seeder/medication', MedicationSeederRouter );
app.use('/api/v1/seeder/user', userSeederRouter );
app.use('/api/v1/seeder/healthtip', healthTipSeederRouter );
app.use('/api/v1/seeder/drug', drugSeederRouter );



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
