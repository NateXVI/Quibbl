const jwt = require('jsonwebtoken');
const Users = require('../models/UserModel');

async function auth(req, res, next) {
	// CHECK IF THE REQUEST HAS A TOKEN
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		// CHECK FOR VALID TOKEN
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);

		// CHECK IF USER EXISTS
		let user = await Users.findById(verified.data._id);
		if (!user) return res.status(401).send('Invalid Token');
		req.user = user;
		next();
	} catch (err) {
		// console.log(err);
		res.status(401).send('Invalid Token!');
		// res.redirect(301, '/login');
	}
}

module.exports = auth;
