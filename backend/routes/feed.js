const router = require('express').Router();
const Users = require('../models/UserModel');
const Posts = require('../models/PostModel');
const Relations = require('../models/RelationsModel');
const validateToken = require('../validation/validateToken');

router.get('/feed', validateToken, async (req, res) => {
	// VALIDATE REQ
	const limit = req.body.limit ? Math.min(10, req.body.limit) : 10;
	const date = req.body.date || Date.now();

	// GET USER RELATIONS
	relations = await Relations.findById(req.user.relations);
	following = relations.following;

	// GET POSTS FROM PEOPLE THEY ARE FOLLOWING
	posts = await Posts.find({ user: { $in: following }, date: { $lt: date } })
		.sort('-date')
		.limit(limit);

	// SEND THE POSTS
	res.send(posts);
});

module.exports = router;
