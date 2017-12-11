require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const models = require("./models");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;

const app = express();

// Requiring our models for syncing
var db = require("./models");

// Static directory
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Using handlebars
app.use(methodOverride("_method"));
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/controllers.js");
app.use("/", routes);

//Creating sequelize database
models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
    app.listen(PORT, function(error) {
      if (error) {
        throw Error(error);
      }

      console.log("Running @:", "http://localhost:" + PORT);
    });
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });
