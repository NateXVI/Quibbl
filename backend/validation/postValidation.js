const Joi = require('joi');

const validation = Joi.object({
	text: Joi.string().min(1).max(280).required(),
});

const validate = (req, res, next) => {
	// VALIDATE REQUEST
	const { error } = validation.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message.split('"').join(''));
	}

	next();
};

module.exports = validate;
