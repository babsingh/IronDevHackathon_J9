var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
  	User = mongoose.model('User');

/* Verify login credentials */
router.post('/login', function(req, res){
	User.findOne({ username: req.body.username })
	  .exec(function(err, user) {
	  	var response = {};
		if (!user){
			err = 'User not registered';
		} else if (user.password === encryptPassword(req.body.password.toString())) {
			req.session.regenerate(function(){
				req.session.user = user.id;
				req.session.username = user.username;
				req.session.fullname = user.fullname;
				req.session.msg = 'Logged in as ' + user.username;
				response.status = "success";
				res.json(response);
			});
		} else {
			err = 'Incorrect username or password';
		}
		if(err) {
			req.session.regenerate(function() {
				req.session.msg = err;
				response.status = "failed";
				res.json(response);
			});
		}
	});
});

module.exports = router;