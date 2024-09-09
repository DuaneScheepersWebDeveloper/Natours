const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect);
router.use(authController.restrictTo('admin'));
router.get(
  '/me',

  userController.getMe,
  userController.getUser,
);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',

  authController.updatePassword,
);

router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

//POST / tour/234fhad/reviews
//GET / tour/234fhad/reviews
//GET / tour/234fhad/reviews/ahwbhbqwad
