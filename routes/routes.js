var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search");
var tableCreate = require("../utils/table-create");
var validateEmail = require("../utils/validate-Email");

// Require auth controller and passport.js module
const authctrl = require('../controllers/authctrl.js');
const passport = require('passport');

// Requre models to have access to User moddle
var models = require("../models");

router.get("/", function(req, res) {
  res.render("index", req.body);
});

router.get("/api/search/:email", function(req, res) {
  // console.log(req.body.email);

  emailSearch = req.params.email;

  if (validateEmail(emailSearch)) {
    clearbitSearch(emailSearch, function(data) {
      res.json(data);
      tableCreate(data);
    });
  } else {
    throw Error("Invalid Email");
  }
});


// ROUTES FOR USER AUTH
router.get('/signup', authctrl.signup);
router.get('/signin', authctrl.signin);
router.get('/logout', authctrl.logout);
router.get('/dashboard', isLoggedIn, authctrl.dashboard);

// Load passport strategies from config
require('../config/passport/passport.js')(passport, models.user);

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup'
}));

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/dashboard',
  failureRedirect: '/signin'
}

));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}

module.exports = router;
