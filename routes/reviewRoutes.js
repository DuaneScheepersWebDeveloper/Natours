const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router.route('/').get(reviewController.getAllReviews).post(
  // Ensure user is authenticated
  authController.restrictTo('user', 'admin'), // Only users or admins can create reviews
  reviewController.setTourUserIds, // Set the tour and user IDs
  reviewController.createReview, // Create the review
);
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.setTourUserIds,
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview,
  );

module.exports = router;
