var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search");
var targetCreate = require("../utils/target-create");
var companyCreate = require("../utils/company-create");
var companyEmailCreate = require("../utils/companyEmail-create");

router.get("/", function(req, res) {
  res.render("index", req.body);
});

router.get("/search/:email", function(req, res) {
  // console.log(req.body.email);

  email = req.params.email;

  clearbitSearch(email, function(data) {
    res.json(data);
    companyCreate(data);
    // companyCreate(data, function(result) {
    //   companyEmailCreate(data, result);
    // });
    targetCreate(data);
    //companyEmailCreate(data);
  });
});

router.get("/search/:email", function(req, res) {
  db.CompanyEmail.create({
    email: req.body.company.companyEmails,
    companyName: req.body.company.companyName
  }).catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    res.json(err);
  });
});

module.exports = router;
