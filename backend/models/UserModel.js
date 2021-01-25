const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 0,
		max: 25,
		default: '',
	},
	username: {
		type: String,
		required: true,
		min: 3,
		max: 15,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	profilePicture: {
		type: String,
		default: '',
	},
	relations: {
		type: mongoose.Schema.Types.ObjectId,
	},
	bio: {
		type: String,
		default: '',
	},
	posts: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
	},
});

module.exports = mongoose.model('Users', userSchema);
