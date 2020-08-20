const Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
	  middlewareObj = {},
	  loginRequiredMessage = "You must be logged in to perform the desired operation. Please log in and try again.";

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", loginRequiredMessage);
	res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	// Check to see if user is logged in
	if (req.isAuthenticated()) {
		// Find the campground with the provided ID
		Campground.findById(req.params.id, (err, foundCampground) => {
			if (err) {
				console.log(err.message);
				req.flash("error", err.message);
				res.redirect("back");
			} else {
				// If user is logged in, check to see if they own this campground entry
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					// If user is in but does not own the campground entry then redirect
					req.flash("error", "You must be the author of a campground to edit it.");
					res.redirect("back");
				}
			}
		});
	} else {
		// If user is not logged in then redirect
		req.flash("error", loginRequiredMessage);
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
	// Check to see if user is logged in
	if (req.isAuthenticated()) {
		// Find the comment with the provided ID
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) {
				console.log(err.message);
				req.flash("error", err.message);
				res.redirect("back");
			} else {
				// Check to see if the user owns this comment entry
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					// If user does not own the comment entry then redirect
					req.flash("error", "You must be the author of a comment to edit it.");
					res.redirect("back");
				}
			}
		});
	} else {
		// If user is not logged in then redirect
		req.flash("error", loginRequiredMessage);
		res.redirect("back");
	}
}

module.exports = middlewareObj;
