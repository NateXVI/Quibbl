const Joi = require('joi');

const validation = Joi.object({
	account: Joi.string().min(0).max(128).required(),
	password: Joi.string().min(8).max(128).required(),
});

const validate = (req, res, next) => {
	// VALIDATE REQUEST
	const { error } = validation.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message.split('"').join(''));
	}

	req.body.account = req.body.account.toLowerCase();

	next();
};

module.exports = validate;
