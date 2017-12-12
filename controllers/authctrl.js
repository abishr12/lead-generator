var db = require("../models/index.js");

module.exports.signup = function(req, res) {
  res.render("signup");
};

module.exports.signin = function(req, res) {
  res.render("signin");
};

module.exports.dashboard = function(req, res) {
  let user_info = req.user;

  //Finds all targets associated with a particular user (using their user id)
  db.Target.findAll({}).then(targets => {
    console.log(targets);
    res.render("dashboard", {
      user_id: user_info.id,
      first_name: user_info.firstname,
      last_name: user_info.lastname,
      targets: targets,
      dashboard: true
    });
  });
};

module.exports.login = function(req, res) {
  res.render("login", {
    login_page: true
  });
};

module.exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/login");
  });
};
