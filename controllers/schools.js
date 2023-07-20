const Schools = require("../models/schools");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const { cloudinary } = require("../cloudinary");
const mbToken = process.env.MAPBOX_TOKEN;
const geocode = mbxGeocoding({ accessToken: mbToken });

module.exports.index = async (req, res) => {
  const schools = await Schools.find({});
  res.render("schools/index", { schools });
};

module.exports.newSchool = (req, res) => {
  res.render("schools/new");
};

module.exports.createSchool = async (req, res, next) => {
  const geoData = await geocode
    .forwardGeocode({
      query: req.body.school.location,
      limit: 1,
    })
    .send();
  const school = new Schools(req.body.school);
  school.geometry = geoData.body.features[0].geometry;
  school.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  school.user = req.user._id;
  await school.save();

  req.flash("success", "Successfully made a new School");
  res.redirect(`schools/${school._id}`);
};

module.exports.showSchool = async (req, res) => {
  const school = await Schools.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "user",
      },
    })
    .populate("user");
  if (!school) {
    req.flash("error", "School does not exist");
    return res.redirect("/schools");
  }
  res.render("schools/show", { school });
};

module.exports.updateSchool = async (req, res) => {
  const { id } = req.params;
  const school = await Schools.findByIdAndUpdate(id, { ...req.body.school });
  const imgs =
    req.files.map((f) => ({ url: f.path, filename: f.filename })) ?? [];
  school.images.push(...imgs);
  await school.save();
  if (req.body.deleteImg) {
    for (let filename of req.body.deleteImg) {
      await cloudinary.uploader.destroy(filename);
    }
    await school.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImg } } },
    });
  }
  req.flash("success", "Successfully Updated School");
  res.redirect(`/schools/${school._id}`);
};

module.exports.editSchool = async (req, res) => {
  const { id } = req.params;
  const school = await Schools.findById(id);
  if (!school) {
    req.flash("error", "School does not exist");
    return res.redirect("/schools");
  }
  res.render("schools/edit", { school });
};

module.exports.deleteSchool = async (req, res) => {
  const { id } = req.params;
  const school = await Schools.findById(id);
  const images = school.images;
  for (let image of images) {
    await cloudinary.uploader.destroy(image.filename);
  }
  await Schools.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a School");
  res.redirect("/schools");
};
