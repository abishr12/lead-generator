var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search");
var tableCreate = require("../utils/table-create");
var validateEmail = require("../utils/validate-Email");
var db = require("../models/index.js");

// Require auth controller and passport.js module
const authctrl = require("../controllers/authctrl.js");
const passport = require("passport");

// Requre models to have access to User moddle
var models = require("../models");

router.get("/", function(req, res) {
  res.render("index", req.body);
});

router.get("/api/savedsearch/:email", (req, res) => {
  savedEmail = req.params.email;

  //Find email related to target
  db.Target.findOne({ where: { email: savedEmail } }).then(responseOne => {
    //Find the company the target works for
    db.Company.findOne({ where: { id: responseOne.CompanyId } }).then(
      responseTwo => {
        //See all company emails for that specific company
        db.CompanyEmail.findAll({
          where: { companyId: responseOne.CompanyId }
        }).then(responseThree => {
          companyEmailsList = [];
          for (var i = 0; i < responseThree.length; i++) {
            companyEmailsList.push(responseThree[i].dataValues.email);
          }
          //console.log(companyEmailsList);
          const resObject = {
            target: responseOne,
            company: responseTwo.dataValues,
            companyEmails: companyEmailsList
          };
          res.json(resObject);
        });
      }
    );
  });
});

router.get("/api/search/:email", (req, res) => {
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

router.put("/api/save/:email", (req, res) => {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
  let emailSaved = req.params.email;
  db.Target.update(
    {
      saved: true
    },
    {
      where: {
        email: emailSaved
      }
    }
  )
    .then(console.log(emailSaved + " is saved"))
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

// ROUTES FOR USER AUTH
router.get("/signup", authctrl.signup);
router.get("/signin", authctrl.signin);
router.get("/logout", authctrl.logout);
router.get("/dashboard", isLoggedIn, authctrl.dashboard);

// Load passport strategies from config
require("../config/passport/passport.js")(passport, models.user);

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
