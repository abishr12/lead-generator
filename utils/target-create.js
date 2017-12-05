var db = require("../models/index.js");

const targetCreate = data => {
  console.log("Target Data:");
  db.Target.create({
    name: data.target.name,
    email: data.target.email,
    employmentCompany: data.target.employmentCompany,
    employmentTitle: data.target.employmentTitle,
    linkedInURL: data.target.linkedInURL,
    twitterHandle: data.target.twitterHandle,
    location: data.target.location,
    biography: data.target.biography
  }).catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    res.json(err);
  });
};

module.exports = targetCreate;
