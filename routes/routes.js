const express = require("express");
const clearbitSearch = require("../utils/clearbit-search");
const tableCreate = require("../utils/table-create");
const validateEmail = require("../utils/validate-Email");
const authctrl = require("../controllers/authctrl.js");
const passport = require("passport");

var db = require("../models");
var router = express.Router();

// ==
// Homepage
// ==
router.get("/", function(req, res) {
  db.Target.findAll({
    include: [{
      model: db.Company,
      include: [{
        model: db.CompanyEmail
      }]
    }]
  }).then(function(targets) {
    res.render("index", {
      'targets': targets
    });
  });
});

// ==
// GET: Clearbit API Search
// This route is hit when the user searches for an email address in the search bar.
// ==
router.get("/api/search/:email", (req, res) => {
  emailSearch = req.params.email;

  if (validateEmail(emailSearch)) {
    clearbitSearch(emailSearch, function(data) {
      res.render('search_results.handlebars', {
        'emailSearch': emailSearch,
        'data': data
      });
    });
  } else {
    throw Error("Invalid Email");
  }
});

// ==
// POST: Persist Clearbit search results to our DB.
// This route is hit when the user hits the save button on a search result.
// ==
router.post("api/search/:email",  (req, res) => {
  emailSearch = req.params.email;
  if (validateEmail(emailSearch)) {
    clearbitSearch(emailSearch, function(data) {
      tableCreate(data);
      res.json(data);
    });
  } else {
    throw Error("Invalid Email");
  }
});


// ROUTES FOR USER AUTH
router.get("/signup", authctrl.signup);
router.get("/signin", authctrl.signin);
router.get("/login", authctrl.login);
router.get("/logout", authctrl.logout);
router.get("/dashboard", isLoggedIn, authctrl.dashboard);

// Load passport strategies from config
require("../config/passport/passport.js")(passport, db.user);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
  })
);

router.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
