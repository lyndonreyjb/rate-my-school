const { schoolSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Schools = require("./models/schools.js");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.validateSchool = (req, res, next) => {
  const { error } = schoolSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateReview = (res, req, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isUser = async (req, res, next) => {
  const { id } = req.params;
  const school = await Schools.findById(id);
  if (!school.user.equals(req.user._id)) {
    req.flash("error", "You do not have permission");
    return res.redirect(`/schools/${school._id}`);
  }
  next();
};

module.exports.isReviewUser = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.user.equals(req.user._id)) {
    req.flash("error", "You do not have permission");
    return res.redirect(`/schools/${id}`);
  }
  next();
};
