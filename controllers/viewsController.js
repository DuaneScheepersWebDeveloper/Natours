const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
exports.getOverview = catchAsync(async (req, res, next) => {
   //1) Get Tour Data from Collection
   const tours = await Tour.find();

   //2) Build template
   //3) Render that template using tour data from step 1


   res.status(200).render('overview', {
      title: 'All Tours',
      tours
   })
});


exports.getTour = catchAsync(async (req, res, next) => {
   // 1) Get the data, for the requested tour (including reviews and guides)
   const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user'
   });

   if (!tour) {
      return next(new AppError('There is no tour with that name.', 404));
   }

   // 2) Build template
   // 3) Render template using data from 1)
   res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour
   });
});

exports.getLoginForm = (req, res, next) => {
   res.status(200).render('login', {
      title: 'Log into your account'
   });
}

exports.getAccount = catchAsync(async (req, res) => {
   const updatedUser = await User.findById(req.user.id);
   console.log('Rendering account page for user:', updatedUser); // Debugging log
   res.status(200).render('account', {
      title: 'Your Account',
      user: updatedUser,
   });
});


exports.updateUserData = catchAsync(async (req, res, next) => {
   console.log('Updating user with data:', req.body);

   if (!req.user) {
      return next(new AppError('User not logged in.', 401));
   }

   const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
         name: req.body.name,
         email: req.body.email,
      },
      {
         new: true,
         runValidators: true,
      }
   );

   if (!updatedUser) {
      return next(new AppError('User not found.', 404));
   }

   console.log('Updated User:', updatedUser); // Debugging log

   res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser,
   });
});




