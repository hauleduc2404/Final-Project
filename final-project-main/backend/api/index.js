const webpush = require('web-push')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const passport = require('passport');
const initializePassport = require("../passportConfig");
const cors = require('cors');

const indexRouter = require('./healthz');
const userRouter = require('./user');
const categoryRouter = require('./category');
const questionRouter = require('./question');
const courseRouter = require('./course');
const courseSectionRouter = require('./courseSection');
const courseReviewRouter = require('./courseReview');
const { handleInputErrors } = require('../modules/middleware')

const app = express();
// app.use(passport.initialize())
initializePassport(passport);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: ['https://localhost:8080', 'http://localhost:8080', 'http://127.0.0.1:8080']
}));

const apiVersion = 'api'

app.use(`/${apiVersion}/`, indexRouter);
app.use(`/${apiVersion}/users`, userRouter);
app.use(`/${apiVersion}/categories`, categoryRouter);
app.use(`/${apiVersion}/courses`, courseRouter);
app.use(`/${apiVersion}/course-sections`, courseSectionRouter);
app.use(`/${apiVersion}/course-reviews`, courseReviewRouter);
app.use(`/${apiVersion}/questions`, questionRouter);

app.get('/', (req, res) => res.send('Hello World!'))
const dummyDb = { subscription: null } //dummy in memory store
const saveToDatabase = async subscription => {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription
}
// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription) //Method to save the subscription to Database
  res.json({ message: 'success' })
})

const vapidKeys = {
  publicKey:
      'BOPELIHvv1SKQZJNRVS5voyRCTzqdHzzkYAf642NJF6p0yIcrimIls6vvIWzhTxOVfqUkJC84vuDqsxP-0oP8P0',
  privateKey: 'mEcfr-VjyPyGW8B5MH0ge6FtJAQ7dVtREx1f6_A3_eM',
}
//setting our previously generated VAPID keys
webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='') => {
  webpush.sendNotification(subscription, dataToSend)
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  //res.send(err);
    res.json({message: err.message})
});

BigInt.prototype.toJSON = function() { return this.toString() }

module.exports = app;
