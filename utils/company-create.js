var db = require("../models/index.js");

const companyCreate = data => {
  db.Company.findOrCreate({
    where: {
      companyName: data.company.companyName,
      companyFounded: data.company.companyFounded
    },
    defaults: {
      companyURL: data.company.companyURL,
      companyBio: data.company.companyBio,
      companyPhone: data.company.companyPhone,
      companyCrunchbase: data.company.companyCrunchbase,
      amountRaised: data.company.amountRaised,
      revenue: data.company.revenue,
      logo: data.company.logo
    }
  })
    .then(result => {
      //Creating the Email Table
      // console.log(result[0].dataValues.id);
      for (var i = 0; i < data.company.companyEmails.length; i++) {
        db.CompanyEmail.create({
          email: data.company.companyEmails[i],
          companyName: data.company.companyName,
          CompanyId: result[0].dataValues.id
        }).catch(function(err) {
          // Whenever a validation or flag fails, an error is thrown
          // We can "catch" the error to prevent it from being "thrown", which could crash our node app
          console.log(err);
        });
      }
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      console.log(err);
    });
};

module.exports = companyCreate;
