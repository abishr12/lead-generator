var db = require("../models/index.js");

const tableCreate = data => {
  //Creating Company Table
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

      for (var i = 0; i < data.company.companyEmails.length; i++) {
        db.CompanyEmail.findOrCreate({
          where: {
            email: data.company.companyEmails[i]
          },
          defaults: {
            companyName: data.company.companyName,
            CompanyId: result[0].dataValues.id
          }
        }).catch(function(err) {
          // Whenever a validation or flag fails, an error is thrown
          // We can "catch" the error to prevent it from being "thrown", which could crash our node app
          console.log(err);
        });
      }

      //Creating Target Table
      db.Target.findOrCreate({
        where: {
          name: data.target.name,
          email: data.target.email,
          employmentCompany: data.target.employmentCompany
        },
        defaults: {
          employmentTitle: data.target.employmentTitle,
          linkedInURL: data.target.linkedInURL,
          twitterHandle: data.target.twitterHandle,
          location: data.target.location,
          biography: data.target.biography,
          CompanyId: result[0].dataValues.id
        }
      }).catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      console.log(err);
    });
};

module.exports = tableCreate;
