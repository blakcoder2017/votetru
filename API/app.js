const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');

const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const electionRoute = require('./routes/electionRoute');
const app = express();

//Provides express middlware to enable CORs
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(helmet());

//this allows us to store session data on the client within a cookie without requiring any database/resource on the server side
app.use(
  cookieSession({
    name: 'votetrue-session',
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
  })
);

// //rate limit - limit the nuber of request from an IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('/api', limiter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/elections', electionRoute);

//Handling missing routes (404)
// app.all('*', (req, res, next) => {
//   next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
// });

//app.use(globalErrorHandler);

module.exports = app;
