module.exports.signup = function (req, res) {
	res.render('signup');
};

module.exports.signin = function (req, res) {
	res.render('signin');
};

module.exports.dashboard = function (req, res) {
	res.render('dashboard');
};

module.exports.login = function (req, res) {
	res.render('login');
};

module.exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		res.redirect('/signin');
	});
};