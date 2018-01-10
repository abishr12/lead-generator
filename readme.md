# Lead Generator

test

### App Dependencies

Here is the dependency list with the modules the needed for user auth.

```json
"dependencies": {
    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.18.2",
    "clearbit": "^1.3.3",
    "dotenv": "^4.0.0",
    "express": "^4.16.2",
    "express-handlebars": "^3.0.0",
    "method-override": "^2.3.10",
    "mysql": "^2.15.0",
    "mysql2": "^1.5.1",
    "nodemon": "^1.12.1",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "sequelize": "^4.23.4"
  }
```

### Changes made to the app

#### app.listen

When `server.js` is launched, it checks to make sure everything with the db is ok, then kicks off `app.listen`. If not, it catches any errors and logs them to the terminal.

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

#### .env file

If it's cool with you, I'd like to move all of the secret keys and DB info to a .env file. We can use the [dotenv](https://www.npmjs.com/package/dotenv) package. `dotenv` will allow us to reference private data  through the servers environment (`process.env`) rather than a `keys.js` file. I am not using it yet, but you can see that I am requiring the package at the top of [server.js](https://github.com/abishr12/lead-generator/blob/b9406a17ebca1043b0f033f96c756a20eaa444f4/server.js#L1).

### User Authentication

#### Passport.js

[Passport.js](http://www.passportjs.org/) is the library I chose to handle user authentication. In the [config](https://github.com/abishr12/lead-generator/blob/auth/config/passport/passport.js) directory, you will find a file named `passport/passport.js` which holds the [logic for creating new users](https://github.com/abishr12/lead-generator/blob/b9406a17ebca1043b0f033f96c756a20eaa444f4/config/passport/passport.js#L9), [encrypting their passwords](https://github.com/abishr12/lead-generator/blob/b9406a17ebca1043b0f033f96c756a20eaa444f4/config/passport/passport.js#L19) using the [bcrypt](https://www.npmjs.com/package/bcrypt) package, [signing in existing users](https://github.com/abishr12/lead-generator/blob/b9406a17ebca1043b0f033f96c756a20eaa444f4/config/passport/passport.js#L54) and validating passwords, also using bcrypt.


#### User Model

Added [User model](https://github.com/abishr12/lead-generator/blob/auth/models/users.js) to handle logic for creating and signing in users. The User model contains an ID (primary key), first and last name, email (the username), password, last login, and logged in/out status. This data is saved in a `users` table in the `lead_generator` database.

#### Auth Controller

The [./controllers/authctrl](https://github.com/abishr12/lead-generator/blob/auth/controllers/authctrl.js) file is basically a set of methods that are exported to handle sign-up, sign-in, detecting if a user is signed-in, and logout.

#### Auth Routes

The `routes` module now requires the following modules: 

```javascript
// Require auth controller and passport.js module
const authctrl = require('../controllers/authctrl.js');
const passport = require('passport');

// Requre models to have access to User moddle
var models = require("../models");
```

#### Auth Views

Added handlebar views for dashboard, sign-up and sign-in. Dashboard will be deleted. The main UI will replace the dashboard view/route.

Sign-in and sign-up forms are super simple (no css).