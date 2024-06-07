const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();
//router.param('id', tourController.checkID);
//router.param('name', tourController.checkBody);
router.route('/top-5-tours').get(tourController.aliasTopTours ,tourController.getAllTours)


router
  .route('/')
  .post(tourController.createTour)
  .get(tourController.getAllTours);

router
  .route('/:id')
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
