const router = require('express').Router();
const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');
const loginValidation = require('../validation/loginValidation');
const validator = require('validator');

router.get('/login', loginValidation, async (req, res) => {
	// CHECK IF USERNAME OR EMAIL
	const isEmail = validator.isEmail(req.body.account);
	console.log(isEmail);
	// CHECK IF USER EXISTS
	const user = await Users.findOne({ email: req.body.account });
	res.send(user);
});

module.exports = router;
