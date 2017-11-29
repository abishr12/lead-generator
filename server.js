var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var PORT = process.env.PORT || 3000;

// ORM = cares about the db stuff and only db stuff
// model = only cares about creating a js object that makes it easier to talk to the db
// controller = requires our model and we can call `burger.selectAll(` in our routes
// view = show me the burger ui

var app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require('./controllers/routes.js');
app.use('/', routes);

app.listen(PORT, function() {
  console.log("listening on port" + PORT + "!");
});
