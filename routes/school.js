const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const schools = require("../controllers/schools");
const { isLoggedIn, isUser, validateSchool } = require("../auth-middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const School = require("../models/schools");

router
  .route("/")
  .get(catchAsync(schools.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateSchool,
    catchAsync(schools.createSchool)
  );

router.get("/new", isLoggedIn, schools.newSchool);

router
  .route("/:id")
  .get(catchAsync(schools.showSchool))
  .put(
    isLoggedIn,
    isUser,
    upload.array("image"),
    validateSchool,
    catchAsync(schools.updateSchool)
  )
  .delete(isLoggedIn, isUser, catchAsync(schools.deleteSchool));

router.get("/:id/edit", isLoggedIn, isUser, catchAsync(schools.editSchool));

module.exports = router;
