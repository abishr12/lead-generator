// var express = require("express");
// var router = express.Router();
// var clearbitSearch = require("../utils/clearbit-search.js");
//
// router.get("/", function(req, res) {
//   res.render("index", req.body);
// });
//
// router.get("/search/:email", function(req, res) {
//   // console.log(req.body.email);
//
//   email = req.params.email;
//
//   clearbitSearch(email, function(data) {
//     res.json(data);
//   });
// });
//
// router.get("/search/:email", function(req, res) {
//     console.log("Target Data:");
//     console.log(req.body);
//     Target.create({
//       name: req.body.name,
//       email: req.body.email,
//       employmentCompany: req.body.employmentCompany,
//       employmentTitle: req.body.employmentTitle,
//       linkedInURL: req.body.linkedInURL,
//       twitterHandle: req.body.twitterHandle,
//       location: req.body.location,
//       biography: req.body.biography
//     });
//   });
//       console.log("Company Data:");
//       console.log(req.body);
//       Company.create({
//         companyName: req.body.companyName
//         companyFounded: req.body.companyFounded,
//         companyURL: req.body.companyURL,
//         companyBio: req.body.companyBio,
//         // companyEmails: req.body.companyEmails,
//         companyPhone: req.body.companyPhone,
//         companyCrunchbase: req.body.companyCrunchbase,
//         amountRaised: req.body.amountRaised,
//         revenue: req.body.revenue,
//         logo: req.body.logo
//       });
//     });
//
// module.exports = router;
