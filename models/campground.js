const mongoose = require("mongoose");

// Create the database schema
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: Number,
	createdAt: {
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// Create database model
module.exports = new mongoose.model("Campground", campgroundSchema);
