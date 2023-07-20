const Schools = require("../models/schools.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  const school = await Schools.findById(req.params.id);
  const review = new Review(req.body.review);
  review.user = req.user._id;
  school.reviews.push(review);
  await review.save();
  await school.save();
  req.flash("success", "Successfully created new review");
  res.redirect(`/schools/${school._id}`);
};
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Schools.findByIdAndUpdate(id.trim(), {
    $pull: { reviews: reviewId.trim() },
  });
  await Review.findByIdAndDelete(reviewId.trim());
  req.flash("success", "Successfully deleted a review");
  res.redirect(`/schools/${id}`);
};
