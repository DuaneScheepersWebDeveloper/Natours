// reviewModel.js
const Tour = require('./../models/tourModel');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.statics.calcAverageRatings = async function(tourId){
  console.log();
const stats =await this.aggregate([
{
  $match:{tour:tourId}
},
 {
    $group:{
     _id:'$tour',
   nRatings:{$sum:1},
    avgRating:{$avg:'$rating'}
   }
 }
]);
console.log(stats);

await Tour.findByIdAndUpdate(tourId,{
  ratingsQuantity:stats[0].nRating,
  ratingsAverage:stats[0].avgRating
})
}


reviewSchema.pre('save', function(next){
  //this points to current review

  this.constructor.calcAverageRatings(this.tour)
  next();
});


// Automatically populate tour and user details on query
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

