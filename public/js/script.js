$(document).ready(function(e) {
  // ===
  // Load up saved emails when the page is loaded.
  // ===
  var initInterfaceData = function() {
    var containerElement = $('#temporary-placeholder');
    $.get('/api/emails').done(function(responseHTML) {                // GET call to fetch all emails. match the url with the one in your controller.
      containerElement.html(responseHTML);                            // responseHTML should be a partial handlebars template
    });
  };

  initInterfaceData();                                                // initialize the ux by calling our helper function

  // ===                                                              // add a header to your event bindings so it's more understandable
  // Search Form: submit
  // ===
  $(document).on("submit", "#search-form", function(event) {          // changed: use delegated event handling
    event.preventDefault();                                           // event.preventDefault() halts the form submission so we can do whatever we want in it's place

    var userSubmittedEmail = $("#top-search").val().trim();
    var url = "/api/search/" + userSubmittedEmail;                          // build the url with the encoded email address.
    console.log(url);
    $.get(url).done(function(data) {
      console.log("data in script.js: ", data);
      // do the stuff you need to do to render here

      // changed: note that this must be the last call within the scope of $.get

      // do not uncomment this until you are injecting HTML into the DOM.
      // it will only cause headaches and confusion if you try to uncomment it now.

      // location.reload();
    });
  });

  // ===
  // Add Result: When clicked, makes an AJAX request for saving emails
  // Assumes the following html:
  // <a href="" class=".add-search-result-button" data-email="{{ target.email }}">Add This to Center of Page</a>
  // ===
  $(document).on("click", ".add-search-result-button", function(event) {
    event.preventDefault();

    var emailToAdd = $(this).data('email');
    var url = "/api/search/" + encodedEmail;
    $.post(url).done(function(htmlResponse) {
      console.log(response);
    });
  });
});

// $(document).ready(function(e) {
// // TODO: Take in User Id
// $("#top-search").on("click", function(event) {
//   event.preventDefault();
//   console.log("working");
//   var emailSearch = $("#top-search")
//     .val()
//     .trim();
//   var url = "/api/search/" + emailSearch;
//   console.log("url", url);
//   $.get(url).done(function(data) {
//     console.log("data in script.js", data)
//   })
// })
//     console.log("data in script.js", data);
//     location.reload();
//   });
// });
// $.post("/api/search/" + emailSearch, function(req, res){
//
// })
//   // TODO: AJAX request for saving emails
//   // TODO: AJAX request for loading up saved emails
//
//
// })
// });
