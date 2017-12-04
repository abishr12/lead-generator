var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search");
var tableCreate = require("../utils/table-create");
var validateEmail = require("../utils/validate-Email");

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

module.exports = router;
