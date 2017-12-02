var db = require("../models/index.js");

const companyCreate = data => {
  db.Company.create({
    companyName: data.company.companyName,
    companyFounded: data.company.companyFounded,
    companyURL: data.company.companyURL,
    companyBio: data.company.companyBio,
    // companyEmails: data.company.companyEmails,
    companyPhone: data.company.companyPhone,
    companyCrunchbase: data.company.companyCrunchbase,
    amountRaised: data.company.amountRaised,
    revenue: data.company.revenue,
    logo: data.company.logo
  }).catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    res.json(err);
  });
};

module.exports = companyCreate;
