var clearbit = require("clearbit")(process.env.API_KEY);

//Clearbit Search Function
var clearbitSearch = (emailsToSearch, callback) => {
  clearbit.Enrichment.find({ email: emailsToSearch, stream: true })
    .then(response => {
      //JSON object
      if (response.person === null) {
        callback(null);
      } else {
        const data = {
          target: {},
          company: {}
        };
        let target = response.person;
        let company = response.company;

        let person = data.target;
        let workingFor = data.company;

        //Target's information
        person.name = target.name.fullName;
        person.email = target.email;
        person.employmentCompany = target.employment.name;
        person.employmentTitle = target.employment.title;
        person.linkedInURL =
          "https://www.linkedin.com/" + target.linkedin.handle;

        person.twitterHandle = target.twitter.handle;
        person.location = target.location;
        person.biography = target.bio;

        //Company Information
        workingFor.companyName = company.name;
        workingFor.companyFounded = company.foundedYear;
        workingFor.companyURL = "https://www." + company.domain;
        workingFor.companyBio = company.site.metaDescription;
        workingFor.companyEmails = company.site.emailAddresses;
        workingFor.companyPhone = company.phone;
        workingFor.companyCrunchbase =
          "https://www.crunchbase.com/" + company.crunchbase.handle;
        workingFor.amountRaised = company.metrics.raised;
        workingFor.revenue = company.metrics.estimatedAnnualRevenue;
        workingFor.logo = company.logo;

        callback(data);
      }
    })
    .catch(err => {
      throw err;
    });
};

module.exports = clearbitSearch;
