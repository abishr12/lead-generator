module.exports.signup = function (req, res) {
	res.render('signup');
};

module.exports.signin = function (req, res) {
	res.render('signin');
};

module.exports.dashboard = function (req, res) {
	let user_info = req.user
	console.log(user_info);
	res.render('index', {
		user_id: user_info.id,
		first_name: user_info.firstname,
		last_name: user_info.lastname
	});
};

module.exports.login = function (req, res) {
	res.render('login');
};

module.exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		res.redirect('/login');
	});
};