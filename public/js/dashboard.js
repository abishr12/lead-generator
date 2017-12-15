$(document).ready(function () {
  console.log("Dashboard JS loaded");

  // Capture user's ID number
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

      newTarget.addClass("fadeInDown");
      //Add to the emails side bar with prepend()
      $("#searched-names").prepend(newTarget);
    });
  });

  // Remove patternfly.min.js behavior
  // Without this, the click handler below will silently fail and click on the contacts do not work
  $("li.list-group-item").off("click");

  // Reattach click handler to existing and the dynamically created list elements
  $("ul#searched-names").on("click", ".list-group-item a", (event) => {
    // Stop the bubbling effect of the click handler
    event.stopPropagation();
    // Prevent click on <a> from navigating to a new page
    event.preventDefault();
    // Remove the active class from any li.active
    $(".nav-pf-vertical .list-group-item.active").removeClass("active");
    // Find the closest li.list-group-item to the click and add the active class
    $(event.target).closest("li.list-group-item").addClass("active");
    $("#contact-area").html("");
    renderPanels()
  });


  function renderPanels() {
    $("#contact-area").html(`
    <div class="col-xs-12 col-sm-8 col-md-8 fadeInUp">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">Panel title</h3>
				</div>
				<div class="panel-body">
					<div class="list-group">
						<button type="button" class="list-group-item">Jeff Lowy</button>
						<button type="button" class="list-group-item">jlowy@sfaf.org</button>
						<button type="button" class="list-group-item">Technical Operations Manager</button>
						<button type="button" class="list-group-item">@jeffreylowy</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4 fadeInUp">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title">Panel title</h3>
				</div>
				<div class="panel-body">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quasi amet corrupti possimus soluta. Laboriosam exercitationem
					voluptatem quaerat unde modi, suscipit ea, aut magni repellendus iure illum, repudiandae cum aperiam!
				</div>
			</div>
		</div>
    `)
  }

});