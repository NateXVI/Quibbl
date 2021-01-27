const router = require('express').Router();
const Users = require('../models/UserModel');
const Relations = require('../models/RelationsModel');
const validateToken = require('../validation/validateToken');

router.post('/follow', validateToken, async (req, res) => {
	// VALIDATE REQUEST
	if (!req.body.id) return res.status(400).send('invalid request');

	// CHECK IF SELF
	if (req.body.id == req.user._id)
		return res.status(400).send('cannot follow yourself');

	// CHECK IF USER EXISTS
	const user = await Users.findById(req.body.id);
	if (!user) return res.status(400).send('user not found');

	// GET USER RELATIONS
	req.userRelations = await Relations.findById(req.user.relations);
	userRelations = await Relations.findById(user.relations);

	// CHECK IF IS ALREADY FOLLOWING
	const isFollowing = 0 <= req.userRelations.following.indexOf(user._id);
	if (isFollowing) return res.status(400).send('already following');

	// ADD USER TO REQ USER FOLLOWING
	req.userRelations.following.push(user._id);
	req.userRelations.followingCount += 1;
	try {
		req.userRelations.save();
	} catch (error) {
		res.status(400).send('something went wrong');
	}

	// ADD REQ USER TO USER FOLLOWERS
	userRelations.followers.push(req.user._id);
	userRelations.followerCount += 1;
	try {
		userRelations.save();
	} catch (error) {
		const index = req.userRelations.following.indexOf(user_id);
		if (index >= 0) {
			req.userRelations.following.splice(index, 1);
			req.userRelations.followingCount -= 1;
			req.userRelations.save();
		}
		return res.status(400).send('something went wrong');
	}

	res.send('user followed');
});

router.post('/unfollow', validateToken, async (req, res) => {
	// VALIDATE REQUEST
	if (!req.body.id) return res.status(400).send('invalid request');

	// CHECK IF USER EXISTS
	const user = await Users.findById(req.body.id);
	if (!user) return res.status(400).send('user not found');

	// GET USER RELATIONS
	req.userRelations = await Relations.findById(req.user.relations);
	userRelations = await Relations.findById(user.relations);

	// CHECK IF FOLLOWING
	const isFollowing = 0 <= req.userRelations.following.indexOf(user._id);
	if (!isFollowing) return res.status(400).send('already not following');

	// REMOVE USER FROM REQ USER FOLLOWING
	const index1 = req.userRelations.following.indexOf(user._id);
	if (index1 >= 0) {
		req.userRelations.following.splice(index1, 1);
		req.userRelations.followingCount -= 1;
	}

	try {
		req.userRelations.save();
	} catch (error) {
		return res.status(400).send('something went wrong');
	}

	// REMOVE REQ USER FROM USER FOLLOWERS
	const index2 = userRelations.followers.indexOf(req.user._id);
	userRelations.followerCount -= 1;
	userRelations.followers.splice(index2, 1);

	try {
		userRelations.save();
	} catch (error) {
		req.userRelations.following.push(user._id);
		return res.status(400).send('something went wrong');
	}

	res.send('user unfollowed');
});

module.exports = router;
