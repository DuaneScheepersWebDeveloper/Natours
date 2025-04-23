const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
//const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
//router.param('id', tourController.checkID);
//router.param('name', tourController.checkBody);
router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'user'),
    tourController.getMonthlyPlan,
  );

  router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getTourWithin);
  // tours-within?distance=233&center=-40,45&unit=mi
  // tours-within/233/center/-40,45/unit/mi

  router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    
    tourController.createTour,
  )
  .get(tourController.getAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,    
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'user'),
    tourController.deleteTour,
  );

// router.route('/:tourId/reviews')
// .post(
//   authController.protect,
//   authController.restrictTo('users','admin'),
//   reviewController.createReview
// );

module.exports = router;
