var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search.js");

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
    });
  });

  router.get("/search/:email", function(req, res) {
      console.log("Company Data:");
      console.log(req.body);
      Company.create({
        companyName: req.body.company.companyName
        companyFounded: req.body.company.companyFounded,
        companyURL: req.body.company.companyURL,
        companyBio: req.body.company.companyBio,
        // companyEmails: req.body.company.companyEmails,
        companyPhone: req.body.company.companyPhone,
        companyCrunchbase: req.body.company.companyCrunchbase,
        amountRaised: req.body.company.amountRaised,
        revenue: req.body.company.revenue,
        logo: req.body.company.logo
      });
    });
    router.get("/search/:email", function(req, res) {
        email: req.body.company.companyEmails,
        companyName:req.body.company.companyName
    });

module.exports = router;
