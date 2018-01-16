# Lead Generator
[![dependencies Status](https://david-dm.org/abishr12/lead-generator/status.svg)](https://david-dm.org/abishr12/lead-generator)

### Table of Contents

[app.listen](#applisten)<br>
[Environment Variables](#environment-variables)<br>
[User Authentication](#user-authentication)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Passport.js](#passportjs)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Controller](#auth-controller)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Routes](#auth-routes)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[Views](#auth-views)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[User Model](#user-model)<br>

### app.listen

When `server.js` is run, it checks to make sure the database is capable of running without errors, then calls `app.listen`. The server will not start if any errors are caught. The process will terminate and the errors will be logged to the console.

```javascript
models.sequelize.sync().then(function () {

  console.log('Nice! Database looks fine');
  app.listen(PORT, function (error) {
    if (error) {
      throw Error(error);
    }

    console.log("Running @:", "http://localhost:" + PORT);
  });

}).catch(function (err) {
  console.log(err, "Something went wrong with the Database Update!");
});
```

### Environment Variables

The `dotenv` is used to reference private data through the server's environment (`process.env`).

### User Authentication

#### Passport.js

The app utilizes the [Passport.js](http://www.passportjs.org/) library to handle user authentication. The Passport [config](https://github.com/abishr12/lead-generator/blob/auth/config/passport/passport.js) directory contains the [logic for creating new users](https://github.com/abishr12/lead-generator/blob/b9406a17ebca1043b0f033f96c756a20eaa444f4/config/passport/passport.js#L9), [encrypting passwords](https://github.com/abishr12/lead-generator/blob/b9406a17ebca1043b0f033f96c756a20eaa444f4/config/passport/passport.js#L19) using the [bcrypt](https://www.npmjs.com/package/bcrypt) package, [signing in existing users](https://github.com/abishr12/lead-generator/blob/b9406a17ebca1043b0f033f96c756a20eaa444f4/config/passport/passport.js#L54) and validating passwords, also using bcrypt.

#### Auth Controller

The [./controllers/authctrl](https://github.com/abishr12/lead-generator/blob/auth/controllers/authctrl.js) file is a set of methods that are exported to handle sign-up, sign-in, detecting if a user is signed-in, and logout.

#### Auth Routes

In order to run, the `routes` module requires the following modules: 

```javascript
// Provide access to the Passport module
const authctrl = require('../controllers/authctrl.js');
const passport = require('passport');

// Provide access to the User moddle
var models = require("../models");
```

#### Auth Views

The app uses Handlebars for the dashboard, sign-up and sign-in.

#### User Model

Added [User model](https://github.com/abishr12/lead-generator/blob/auth/models/users.js) to handle logic for creating and signing in users. The User model contains an ID (primary key), first and last name, email (the username), password, last login, and logged in/out status. This data is saved in a `users` table in the `lead_generator` database.