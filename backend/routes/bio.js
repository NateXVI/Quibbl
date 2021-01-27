const router = require('express').Router();
const validateToken = require('../validation/validateToken');

router.post('/bio', validateToken, async (req, res) => {
	if (!req.body.text) req.body.text = '';
	if (req.body.text.length > 1024) return res.status(400).send('bio too long');

	req.user.bio = req.body.text;

	try {
		req.user.save();
	} catch (error) {
		return res.status(400).send('something went wrong');
	}

	res.send('bio updated');
});

module.exports = router;
