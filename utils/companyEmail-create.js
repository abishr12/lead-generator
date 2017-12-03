var db = require("../models/index.js");

const companyEmailCreate = (data, companyInfo) => {
  console.log("company info ");
  for (var i = 0; i < data.company.companyEmails.length; i++) {
    db.CompanyEmail.create({
      email: data.company.companyEmails[i],
      companyName: data.company.companyName,
      company: companyInfo
    }).catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      console.log(err);
    });
  }
};

module.exports = companyEmailCreate;
