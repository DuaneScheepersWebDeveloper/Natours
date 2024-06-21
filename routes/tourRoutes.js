const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const router = express.Router();
//router.param('id', tourController.checkID);
//router.param('name', tourController.checkBody);
router.route('/top-5-tours').get(authController.protect,tourController.aliasTopTours ,tourController.getAllTours)
router.route('/tour-stats').get(authController.protect,tourController.getTourStats);
router.route('/monthly-plan/:year').get(authController.protect,tourController.getMonthlyPlan);

router
  .route('/')
  .post(tourController.createTour)
  .get(authController.protect,tourController.getAllTours);

router
  .route('/:id')
  .get(authController.protect,tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
