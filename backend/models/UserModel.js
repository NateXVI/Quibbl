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
	followers: {
		type: [String],
		required: true,
		default: [],
	},
	following: {
		type: [String],
		required: true,
		default: [],
	},
	followerCount: {
		type: Number,
		default: 0,
	},
	followingCount: {
		type: Number,
		default: 0,
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
