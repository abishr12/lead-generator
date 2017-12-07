// {
//   "target": {
//     "name": "Bob Goodson",
//     "email": "bgoodson@quid.com",
//     "employmentCompany": "Quid",
//     "employmentTitle": "Founder, CEO",
//     "linkedInURL": "https:www.linkedin.com/in/bobgoodson",
//     "twitterHandle": "@null",
//     "location": "San Francisco, CA, US",
//     "biography": null
//   },
//   "company": {
//     "companyName": "Quid",
//     "companyFounded": 2010,
//     "companyURL": "http://www.quid.com",
//     "companyBio": "Quid is a platform that searches, analyzes and visualizes the world’s collective intelligence to help answer strategic questions.",
//     "companyEmails": [
//       "general@quid.com",
//       "press@quid.com"
//     ],
//     "companyPhone": "+1 415-495-1062",
//     "companyCrunchbase": "https://www.crunchbase.com/organization/quid",
//     "amountRaised": 66500000,
//     "revenue": "$10M-$50M",
//     "logo": "https://logo.clearbit.com/quid.com"
//   }
// }

$(document).ready(function(e) {
  // TODO: Take in User Id
  $("#searchBtn").on("click", function(event) {
    event.preventDefault();
    console.log("working");
    var emailSearch = $("#searchField")
      .val()
      .trim();
    var url = "/api/search/" + emailSearch;
    console.log(url);
    $.get(url).done(function(data) {
      console.log(data)
    })
  })
      console.log(data);
      location.reload();
    });
  });

  // TODO: AJAX request for saving emails
  // TODO: AJAX request for loading up saved emails


})
});
