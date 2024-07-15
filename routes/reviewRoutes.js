const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(reviewController.getAllReviews).post(
  authController.protect,
  authController.restrictTo('user'), // Make sure this role matches the user's role
  reviewController.createReview,
);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'), // Ensure roles match for update
    reviewController.updateReview,
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'), // Ensure roles match for delete
    reviewController.deleteReview,
  );

module.exports = router;
