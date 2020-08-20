const express = require("express"),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
	  Middleware = require("../middleware"),
	  router = express.Router({mergeParams: true});

// NEW COMMENT ROUTE - Nested route that will call a form to enter a comment for a specified campground
router.get("/new", Middleware.isLoggedIn, (req, res) => {
	// Find the campground with the provided ID
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			// Render new comment template with the selected campground
			res.render("comments/new", {campground: campground});
		}
	});
});

// POST COMMENT ROUTE - Nested route that will post the comment for a specified campground to that campground via the id
router.post("/", Middleware.isLoggedIn, (req, res) => {
	// Look up the campground with the provided ID
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err.message);
			res.redirect("/campgrounds");
		} else {
			// Create the new comment and save to the campground in the DB
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err.message);
					req.flash("error", err.message);
				} else {
					// Add username and id to comment and then save comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(req.user.username + " successfully added a comment to '" + campground.name + "'!");
					req.flash("success", "Successfully added a comment to '" + campground.name + "'!");
					// Redirect to the campground show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// EDIT COMMENT ROUTE - Show the edit form for a specified campground/comment by campground ID & comment ID
router.get("/:comment_id/edit", Middleware.checkCommentOwnership, (req, res) => {
	// Find the campground with the provided ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		// Find the comment with the provided ID
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			// Render the edit template with found campground comment
			res.render("comments/edit", {campground: foundCampground, comment: foundComment});
		});
	});
});

// UPDATE COMMENT ROUTE - Save the edits made to a selected campground
router.put("/:comment_id", Middleware.checkCommentOwnership, (req, res) => {
	// Sanitize the body prior to saving to remove any script tags that may have been entered by the user.
	req.body.comment.text = req.sanitize(req.body.comment.text);
	const newComment = req.body.comment;
	Comment.findByIdAndUpdate(req.params.comment_id, newComment, (err, updatedComment) => {
		// Redirect to the show page for the campground and (updated) comment
		console.log("Updated comment: " + updatedComment.text + " successfully!");
		res.redirect("/campgrounds/" + req.params.id);
	});
});

// DELETE COMMENT ROUTE - Destroy/Delete the selected comment
router.delete("/:comment_id", Middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err, commentToDelete) => {
		console.log(commentToDelete.text);
		if (err) {
			console.log(err.message);
		} else {
			console.log("Deleted comment: ", commentToDelete.text);
			req.flash("success", "Deleted comment: ", commentToDelete.text);
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;
