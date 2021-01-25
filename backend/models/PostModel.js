const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	text: {
		type: String,
		required: true,
		min: 1,
		max: 280,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: {
		type: [mongoose.Types.ObjectId],
		default: [],
	},
	likeCount: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('Posts', postSchema);
