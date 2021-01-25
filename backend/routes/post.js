const router = require('express').Router();
const Users = require('../models/UserModel');
const Posts = require('../models/PostModel');
const validateToken = require('../validation/validateToken');
const postValidation = require('../validation/postValidation');

router.post('/post', validateToken, postValidation, async (req, res) => {
	// CREATE NEW POST
	const post = new Posts({
		user: req.user._id,
		text: req.body.text,
	});

	// ADD POST TO USER
	req.user.posts.push(post._id);
	res.send(req.user);

	// SAVE POST AND USER
	try {
		req.user.save();
		post.save();
	} catch (error) {
		res.status(400).send('something went wrong');
		Posts.findOneAndDelete(post._id).catch();
		Users.findOneAndDelete(req.user._id).catch();
	}
});

module.exports = router;
