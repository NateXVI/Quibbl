const mongoose = require('mongoose');

const relationsSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	followers: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
		default: [],
	},
	following: {
		type: [mongoose.Schema.Types.ObjectId],
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
});

module.exports = mongoose.model('Relations', relationsSchema);
