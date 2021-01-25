const router = require('express').Router();
const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');
const loginValidation = require('../validation/loginValidation');
const validator = require('validator');

router.get('/login', loginValidation, async (req, res) => {
	// CHECK IF USERNAME OR EMAIL
	const isEmail = validator.isEmail(req.body.account);

	// CHECK IF USER EXISTS
	let user;
	if (isEmail) user = await Users.findOne({ email: req.body.account });
	else user = await Users.findOne({ username: req.body.account });
	if (!user) return res.status(400).send('user not found');
});

module.exports = router;
