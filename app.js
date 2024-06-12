const express = require('express');
const app = express();
const morgan = require('morgan');

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
const err = new Error(`Can't find ${req.originalUrl} on this server!`);
err.status = 'fail';
err.statusCode = 404;

next(err);
});

app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'
  res.status(err.statusCode).json({
    status: err.status,
    message:err.message
  });
})

module.exports = app;
//npm install -g ndb