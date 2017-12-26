var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search");
var tableCreate = require("../utils/table-create");
//var validateEmail = require("../utils/validate-Email");
const hbs = require("handlebars");
var db = require("../models/index.js");

// Require auth controller and passport.js module
const authctrl = require("../controllers/authctrl.js");
const passport = require("passport");

// Requre models to have access to User module
var models = require("../models");

//API for saved emails search
router.get("/api/savedsearch/:email", (req, res) => {
  savedEmail = req.params.email;
  console.log("*".repeat(80));
  console.log(`Saved Route Activated for ${savedEmail}`);
  //Find email related to target
  db.Target.findOne({ where: { email: savedEmail } }).then(targetData => {
    console.log("*".repeat(80));
    console.log(targetData);
    //Find the company the target works for
    db.Company.findOne({ where: { id: targetData.CompanyId } }).then(
      companyData => {
        //See all company emails for that specific company
        db.CompanyEmail.findAll({
          where: { companyId: targetData.CompanyId }
        }).then(companyEmailData => {
          companyEmailsList = [];
          for (let i = 0; i < companyEmailData.length; i++) {
            companyEmailsList.push(companyEmailData[i].dataValues.email);
          }

          //Return JSON object with target's information
          let resObject = {
            target: targetData,
            company: companyData.dataValues,
            companyEmails: companyEmailsList
          };
          res.json(resObject);
        });
      }
    );
  });
});

//Clearbit API search with unique user Id
router.get("/api/search/:email/:userId", (req, res) => {
  emailSearch = req.params.email;
  userId = req.params.userId;

  // Validate email is actually an email, otherwise throw an error

  clearbitSearch(emailSearch, function(data) {
    tableCreate(data, userId);

    let loadedPartial = hbs.partials["sidebar-element"];
    if (!loadedPartial) {
      return res.status(404).json({
        error: "Snippet not found."
      });
    }

    // /** Render the partial. */
    let renderedPartial = loadedPartial(data.target);

    let responseObject = {
      data: data,
      renderedPartial: renderedPartial
    };

    res.json(responseObject);
  });
});

//Save the email to be searched stored in the database
router.put("/api/save/:email", (req, res) => {
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
router.get("/", authctrl.login);
router.get("/login", authctrl.login);
router.get("/signup", authctrl.login);
router.get("/signin", authctrl.signin);
router.get("/logout", authctrl.login);
router.get("/dashboard", isLoggedIn, authctrl.dashboard);

// Load passport strategies from config
require("../config/passport/passport.js")(passport, models.user);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  })
);

router.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
