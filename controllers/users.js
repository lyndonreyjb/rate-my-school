const User = require("../models/user");

module.exports.showRegister = (req, res) => {
  res.render("users/register");
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.userRegister = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);

    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Rate My School!");
      res.redirect("/schools");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("register");
  }
};

module.exports.authLogin = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.returnTo || "/schools";
  res.redirect(redirectUrl);
};

module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have Logout!");
    res.redirect("/schools");
  });
};
