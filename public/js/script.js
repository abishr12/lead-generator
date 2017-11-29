// var slideout = new Slideout({
//   'panel': document.getElementById('panel'),
//   'menu': document.getElementById('menu'),
//   'padding': 256,
//   'tolerance': 70
// });
//   document.querySelector('.toggle-button').addEventListener('click', function() {
//   slideout.toggle();
// });
console.log("yo");
$(".toggle").click(function() {
    // $('.').toggleClass('transform-active');
    $( "div.box" ).toggleClass( "hide" )
    $("div.four").toggleClass("hide")
    $("div.input-group").toggleClass("remove")
});
