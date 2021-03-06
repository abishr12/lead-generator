$(document).ready(function() {
  console.log("Dashboard JS loaded");

  // Capture user's ID number
  const userId = $("#Username").attr("data-user_id");

  //Use Search for target and callback to solve the issue

  $("#searchform").on("submit", event => {
    //Prevent normal browser behavior
    event.preventDefault();

    // Trim and store value entered by user in the search field
    let emailInput = $("#emailSearch")
      .val()
      .trim();

    let URL = `/api/search/${emailInput}/${userId}`;

    $.get(URL).done(response => {
      console.log("Response ---> " + response);
      if (typeof response != "object") {
        $("#warningMessage").text(response);
        $("#warningModal").modal("show");
      } else {
        // Clear the email search field and display the loading icon.
        loader();

        // Convert the renderedPartial String to a jQuery object.
        let newTarget = $(response.renderedPartial);

        newTarget.addClass("fadeInDown");

        // Adding an event listener to detect when the fadeInDown animation is complete
        // newTarget is an array. newTarget[0] is the <li> just created
        // This prevents the fadeInDown CSS animation from looping when the sidebar is opened and closed
        newTarget[0].addEventListener("animationend", function() {
          // When an arrow function is used, 'this' is the global object
          $(this).removeClass("fadeInDown");
        });

        //Add to the emails side bar with prepend()
        $("span#saved-targets").prepend(newTarget);

        // Load the new target's information
        renderPanels(response.data);
      }
    });
  });

  // Remove patternfly.min.js behavior
  // Without this, the click handler below will silently fail and click on the contacts do not work
  $("li.list-group-item").off("click");

  // Reattach click handler to existing and the dynamically created list elements
  $("span#saved-targets").on("click", ".list-group-item a", event => {
    // Stop the bubbling effect of the click handler
    event.stopPropagation();
    // Prevent click on <a> from navigating to a new page
    event.preventDefault();
    // Remove the active class from any li.active
    $(".nav-pf-vertical .list-group-item.active").removeClass("active");
    // Find the closest li.list-group-item to the click and add the active class
    let liClicked = $(event.target).closest("li.list-group-item");
    // Store the email of the clicked target in a variable
    let targetEmailAddress = liClicked.data("email");
    // Add the active class to the clicked target
    liClicked.addClass("active");
    // Update the page with the clicked target's information
    getSavedTartget(targetEmailAddress, renderPanels);
  });

  // Function that binds click event handlers to save butotns on dynamically created panels
  $("div#contact-area").on("click", "a.save", event => {
    console.log(event);
  });

  function getSavedTartget(targetEmail, render) {
    $.get(`api/savedsearch/${targetEmail}`).done(targetResponse => {
      render(targetResponse);
    });
  }

  // Build the panel/card that contains the target and company information
  function renderPanels(targetResponse) {
    let targetHTML = ``;
    let companyHTML = ``;

    // Build HTML block based on information available in target record
    if (targetResponse.target.employmentTitle) {
      targetHTML += `<a class="list-group-item"><i class="fa fa-briefcase" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;${targetResponse
        .target.employmentTitle || "Job title not available"} | ${targetResponse
        .company.companyName || "Company not available"}
        </a>`;
    }
    if (targetResponse.target.email) {
      targetHTML += `<a href="mailto:${
        targetResponse.target.email
      }" class="list-group-item">
          <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;${
            targetResponse.target.email
          }
        </a>`;
    }
    if (targetResponse.target.linkedInURL) {
      targetHTML += `<a href= ${
        targetResponse.target.linkedInURL
      } target="_blank" class="list-group-item" >
          <i class="fa fa-linkedin-square" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;LinkedIn Profile
        </a>`;
    }
    if (targetResponse.target.location) {
      targetHTML += `<a class="list-group-item">
          <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;${
            targetResponse.target.location
          }
        </a>`;
    }
    if (targetResponse.target.twitterHandle) {
      targetHTML += `<a href="https://www.twitter.com/${
        targetResponse.target.twitterHandle
      }" target="_blank" class="list-group-item" >
            <i class="fa fa-twitter" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;@${
              targetResponse.target.twitterHandle
            }
        </a>`;
    }

    // Build HTML block based on information available in company record
    if (targetResponse.company.companyName) {
      companyHTML += `<a class="list-group-item">${
        targetResponse.company.companyName
      }</a>`;
    }
    if (targetResponse.company.companyFounded) {
      companyHTML += `<a class="list-group-item">Est. ${
        targetResponse.company.companyFounded
      }</a>`;
    }
    if (targetResponse.company.companyURL) {
      companyHTML += `<a href="${
        targetResponse.company.companyURL
      }" target="_blank" class="list-group-item">
          ${targetResponse.company.companyURL}</button>
        </a>`;
    }

    // Clear the currently selected target
    $("#contact-area").html("");
    // Update the page with a new target's information
    $("#contact-area").html(`
    <div class="col-xs-12 col-sm-8 col-md-8 fadeInUp">
			<div class="panel panel-primary">
				<div class="panel-heading">
          <h3 class="panel-title" style="display:inline-block">${
            targetResponse.target.name
          }</h3>
          <a href="#" class="save"><i class="glyphicon glyphicon-floppy-save pull-right"></i></a>
				</div>
				<div class="panel-body">
          <div class="list-group">
						${targetHTML}
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4 fadeInUp">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title">Company Information</h3>
				</div>
				<div class="panel-body">
					<div class="list-group">
						${companyHTML}
					</div>
				</div>
			</div>
		</div>
    `);
  }

  function loader() {
    $("emailSearch").val("");
    $("#contact-area").html("");
    $("#contact-area").html(
      `
      <div class="loader">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
				<rect x="0" y="0" width="4" height="10" fill="#0b6fc3">
					<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s"
					 repeatCount="indefinite" />
				</rect>
				<rect x="10" y="0" width="4" height="10" fill="#0b6fc3">
					<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s"
					 repeatCount="indefinite" />
				</rect>
				<rect x="20" y="0" width="4" height="10" fill="#0b6fc3">
					<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s"
					 repeatCount="indefinite" />
				</rect>
      </svg>
      </div>
      `
    );
  }
});
