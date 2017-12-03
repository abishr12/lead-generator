var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search.js");

// Require auth controller and passport.js module
const authctrl = require('../controllers/authctrl.js');
const passport = require('passport');

// Requre models to have access to User moddle
var models = require("../models");

router.get("/", function(req, res) {
  res.render("index", req.body);
});

router.get("/search/:email", function(req, res) {
  // console.log(req.body.email);

  email = req.params.email;

  clearbitSearch(email, function(data) {
    res.json(data);
  });
});

router.get("/search/:email", function(req, res) {
  console.log("Target Data:");
  console.log(req.body);
  Target.create({
    name: req.body.target.name,
    email: req.body.target.email,
    employmentCompany: req.body.target.employmentCompany,
    employmentTitle: req.body.target.employmentTitle,
    linkedInURL: req.body.target.linkedInURL,
    twitterHandle: req.body.target.twitterHandle,
    location: req.body.target.location,
    biography: req.body.target.biography
  }).catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    res.json(err);
  });
});

router.get("/search/:email", function(req, res) {
  console.log("Company Data:");
  console.log(req.body);
  Company.create({
    companyName: req.body.company.companyName,
    companyFounded: req.body.company.companyFounded,
    companyURL: req.body.company.companyURL,
    companyBio: req.body.company.companyBio,
    // companyEmails: req.body.company.companyEmails,
    companyPhone: req.body.company.companyPhone,
    companyCrunchbase: req.body.company.companyCrunchbase,
    amountRaised: req.body.company.amountRaised,
    revenue: req.body.company.revenue,
    logo: req.body.company.logo
  }).catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    res.json(err);
  });
});
router.get("/search/:email", function(req, res) {
  CompanyEmail.create({
    email: req.body.company.companyEmails,
    companyName: req.body.company.companyName
  }).catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    res.json(err);
  });
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
