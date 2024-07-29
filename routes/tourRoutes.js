const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const router = express.Router();
//router.param('id', tourController.checkID);
//router.param('name', tourController.checkBody);
router.route('/top-5-tours').get(tourController.aliasTopTours ,tourController.getAllTours)
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .post(tourController.createTour)
  .get(authController.protect, tourController.getAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin','lead-guide','user'),
    tourController.deleteTour);

    router.route('/:tourId/reviews').post(
      authController.protect,
      authController.restrictTo('users','admin'),
      reviewController.createReview
    );

module.exports = router;
