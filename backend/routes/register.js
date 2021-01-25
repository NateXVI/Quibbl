const router = require('express').Router();
const Users = require('../models/UserModel');
const Relations = require('../models/RelationsModel');
const registerValidation = require('../validation/registerValidation');
const bcrypt = require('bcrypt');

router.post('/register', registerValidation, async (req, res) => {
	// CHECK IF EMAIL IS BEING USED
	const emailExist = await Users.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('email already being used');

	// CHECK IF USERNAME IS TAKEN
	const usernameTaken = await Users.findOne({ username: req.body.username });
	if (usernameTaken) return res.status(400).send('username taken');

	// HASH PASSWORD
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	// CREATE USER
	const user = new Users({
		name: req.body.name || '',
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	});

	// CREATE RELATION
	const relations = new Relations({
		user: user._id,
	});

	// ASSIGN RELATION TO USER
	user.relations = relations._id;

	try {
		const savedUser = await user.save();
		const savedRelations = relations.save();
		res.send('New user created');
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
