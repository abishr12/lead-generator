// Require bcrypt to secure user passwords
const bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
	// Initialize the passport-local strategy
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	// CREATE USER
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		// Allow us to pass back the entire request to the callback
		passReqToCallback: true
	}, function (req, email, password, done) {

		// Store a user's details.
		var generateHash = function (password) {
			return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
		};

		// Using Sequelize User model, check to see if the user already exists, and if not then add them
		User.findOne({
			where: {
				email: email
			}
		}).then(function (user) {
			if (user) {
				return done(null, false, {
					message: 'That email is already taken'
				});

			} else {
				var userPassword = generateHash(password);
				var data = {
					email: email,
					password: userPassword,
					firstname: req.body.firstname,
					lastname: req.body.lastname
				};

				User.create(data).then(function (newUser, created) {
					if (!newUser) {
						return done(null, false);
					}
					if (newUser) {
						return done(null, newUser);
					}
				});
			}
		});
	}));

	//LOCAL SIGNIN
	passport.use('local-signin', new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},

		function (req, email, password, done) {
			var User = user;
			var isValidPassword = function (userpass, password) {
				return bCrypt.compareSync(password, userpass);
			}

			User.findOne({
				where: {
					email: email
				}
			}).then(function (user) {
				if (!user) {
					return done(null, false, {
						message: 'Email does not exist'
					});
				}

				if (!isValidPassword(user.password, password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}

				var userinfo = user.get();
				return done(null, userinfo);

			}).catch(function (err) {
				console.log("Error:", err);
				return done(null, false, {
					message: 'Something went wrong with your Signin'
				});
			});
		}

	));

	// Serialize user
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	// Deserialize user 
	passport.deserializeUser(function (id, done) {
		User.findById(id).then(function (user) {
			if (user) {
				done(null, user.get());

			} else {
				done(user.errors, null);
			}
		});
	});

}