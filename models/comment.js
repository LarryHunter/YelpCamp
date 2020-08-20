const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
	text: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = new mongoose.model("Comment", commentSchema);
