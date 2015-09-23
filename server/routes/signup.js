var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
  	User = mongoose.model('User');

function encryptPassword(password){
	//algorithm - sha256
	return crypto.createHash('sha256').update(password).digest('base64').toString();
}

/* Register user. */
router.post('/signup', function(req, res) {
    User.findOne({ username: req.body.username })
      .exec(function(err, user) {
    	if (!user) {
	        console.log("Signing Up - " + req.body.username);
	        var user = new User({username:req.body.username});
	        var response = {};
	        user.set('password', encryptPassword(req.body.password));
	        user.set('fullname', req.body.fullname);
	        user.save(function(err) {
				if (err) {
					res.session.error = err;
					response.status = "failed";
					res.json(response);
				} else {
					req.session.user = user.id;
					req.session.username = user.username;
					req.session.fullname = user.fullname;
					req.session.msg = 'Logged in as ' + user.username;
					response.status = "success";
					res.json(response);
				}
        	});
		} else{
	        req.session.msg = 'Username already exists';
	        reponse.status = "user_exists";
	        res.json(response);
		}
    });
});

module.exports = router;