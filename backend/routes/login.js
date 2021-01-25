const router = require('express').Router();
const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');
const loginValidation = require('../validation/loginValidation');
const validateToken = require('../validation/validateToken');
const validator = require('validator');
const jwt = require('jsonwebtoken');

router.get('/login', loginValidation, async (req, res) => {
	// CHECK IF USERNAME OR EMAIL
	const isEmail = validator.isEmail(req.body.account);

	// CHECK IF USER EXISTS
	let user;
	if (isEmail) user = await Users.findOne({ email: req.body.account });
	else user = await Users.findOne({ username: req.body.account });
	if (!user) return res.status(400).send('user not found');

	// CHECK IF PASSWORD IS CORRECT
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('invalid password');

	// CREATE AND ASSIGN TOKEN
	const token = jwt.sign(
		{
			data: { _id: user._id },
		},
		process.env.TOKEN_SECRET,
		{ expiresIn: '7d' }
	);

	res.send('logged in ' + token);
});

router.get('/check', validateToken, async (req, res) => {
	res.send('valid token');
});

module.exports = router;
