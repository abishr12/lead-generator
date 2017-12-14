$(document).ready(function() {
  console.log("Dashboard JS loaded");
  
  //API requests
  const userId = $("#Username").attr("data-user_id");

  $("#searchform").on("submit", (event) => {

    //Prevent normal browser behavior
    event.preventDefault();

    // Trim and store value entered by user in the search field
    let emailInput = $("#emailSearch").val().trim();
    console.log(emailInput);


    let URL = `/api/search/${emailInput}/${userId}`;

    $.get(URL).done(response => {
      console.log(response);
      // Convert the renderedPartial String to a jQuery object.
      let newTarget = $(response.renderedPartial);
      console.log(newTarget);

      //Add to the emails side bar with prepend()
      $("#searched-names").prepend(newTarget);
    });
  });
});
