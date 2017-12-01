var express = require("express");
var router = express.Router();
var clearbitSearch = require("../utils/clearbit-search.js");

router.get("/", function(req, res) {
  res.render("index", req.body);
});

router.get("/search/:email", function(req, res) {
  //console.log(req.body.email);

  email = req.params.email;

  clearbitSearch(email, function(data) {
    res.json(data);
  });
});

module.exports = router;
