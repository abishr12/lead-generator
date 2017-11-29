var express = require('express');
var router = express.Router();
var userData = {
  name: 'Bob Oblaw',
  phone: 8675309,
  email: 'bob@boboblawslawblog.com',
  website: 'thisisawebsite.com'
}

router.get('/', function(req, res) {
	res.render('index', req.body);
})

module.exports = router;
