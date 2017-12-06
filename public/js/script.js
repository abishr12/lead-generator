// var slideout = new Slideout({
//   'panel': document.getElementById('panel'),
//   'menu': document.getElementById('menu'),
//   'padding': 256,
//   'tolerance': 70
// });
//   document.querySelector('.toggle-button').addEventListener('click', function() {
//   slideout.toggle();
// });

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
<<<<<<< HEAD
      console.log(data)
    })
  })
=======
      console.log(data);
      location.reload();
    });
  });

  // TODO: AJAX request for saving emails
  // TODO: AJAX request for loading up saved emails

>>>>>>> 68449b285d4c1f512ac10329f5c2359d9156e82c
  console.log("yo");
  $(".toggle").click(function() {
    // $('.').toggleClass('transform-active');
    $("div.box").toggleClass("hide");
    // $("div.four").toggleClass("hide")
    // $("div.input-group").toggleClass("remove")
  });
<<<<<<< HEAD

  // if (err) {
  //   alert("incorrect response")
  // };
})
=======
});
>>>>>>> 68449b285d4c1f512ac10329f5c2359d9156e82c
