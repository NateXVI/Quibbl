const Joi = require('joi');

const validation = Joi.object({
	name: Joi.string().min(0).max(25).allow(null, ''),
	username: Joi.string().trim().min(3).max(15).required(),
	email: Joi.string().max(128).required().email(),
	password: Joi.string().min(8).max(128).required(),
});

const validate = (req, res, next) => {
	// VALIDATE REQUEST
	const { error } = validation.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message.split('"').join(''));
	}
	// TRIM SPACES ON THE END OF STRINGS
	req.body.name = req.body.name.trim();
	req.body.username = req.body.username.trim().toLowerCase();
	req.body.email = req.body.email.trim().toLowerCase();

	// CHECK FOR VALID USERNAME
	const noSpace = /[\s\W]/;
	if (noSpace.test(req.body.username)) {
		return res
			.status(400)
			.send('username cannot contain special characters or spaces');
	}

	next();
};

module.exports = validate;
