const router = require('express').Router();
const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');
const validateToken = require('../validation/validateToken');
const validator = require('validator');
const jwt = require('jsonwebtoken');

router.get('/user', validateToken, async (req, res) => {
	// GET USER IF ID IS SPECIFIED
	isSelf = !req.body.id;
	const user = !isSelf ? await Users.findById(req.body.id) : req.user;
	if (!user) return res.status(400).send('user not found');

	// REMOVE UNWANTED VALUES
	user.password = user.date = user.__v = user.relations = user.posts = undefined;
	if (!isSelf) user.email = undefined;

	// SEND USER
	res.send(user);
});

module.exports = router;
