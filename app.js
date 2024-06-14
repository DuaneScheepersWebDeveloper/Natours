const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

//1.Middleware
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next(); //always call next
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*',(req,res,next)=>{
next(new AppError(`Can not find ${req.originalUrl} on this server!`));
});

  app.use(globalErrorHandler)

module.exports = app;
//npm install -g ndb