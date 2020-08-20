const express = require("express"),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
	  Middleware = require("../middleware"),
	  router = express.Router();

// INDEX ROUTE - Display a list of all items
router.get("/", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});	
		}
	})
});

// NEW ROUTE - Displays a form to crete a new item
router.get("/new", Middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// CREATE ROUTE - Adds a new item to the database
router.post("/", Middleware.isLoggedIn, (req, res) => {
	// get data from the form and add to the campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: name, image: image, description: description, price: price, author: author };

	// Create a new campground and save to the DB
	Campground.create(newCampground, (err, campground) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log(campground.name + " successfully added!");
			// redirect back to the campgrounds page.
			res.redirect("/campgrounds");
		}
	});
});

// SHOW ROUTE - Show info about a single item
router.get("/:id", (req, res) => {
	// Find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if (err) {
			console.log(err.message);
		} else {
			// Render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT ROUTE - Show the edit form for a specified campground
router.get("/:id/edit", Middleware.checkCampgroundOwnership, (req, res) => {
	// Find the campground with the provided ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		// Render the edit template with found campground
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE ROUTE - Save the edits made to a selected campground
router.put("/:id", Middleware.checkCampgroundOwnership, (req, res) => {
	// Sanitize the body prior to saving to remove any script tags that may have been entered by the user.
	req.body.campground.name = req.sanitize(req.body.campground.name);
	req.body.campground.description = req.sanitize(req.body.campground.description);
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedcampground) => {
		if (err) {
			console.log(err.message);
			res.redirect("/campgrounds");
		} else {
			console.log(updatedcampground.name + " successfully updated!");
			// redirect to the show page for the updated campground
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DELETE ROUTE - Destroy/Delete the selected campground
// router.delete("/:id", function (req, res) {
// 	Campground.findByIdAndRemove(req.params.id, function (err, campground) { 
// 		if (err) {
// 			console.log(err.message);
// 		} else {
// 			console.log("Deleted campground: ", campground.name);
// 		}
// 	});
// 	res.redirect("/campgrounds");
// });

// THE ABOVE DELETE ROUTE WORKS BUT IT WILL *NOT* REMOVE THE ASSOCIATED COMMENTS FROM THE DATABASE
// USING THE DELETE ROUTE BELOW WILL REMOVE BOTH CAMPGROUND AND ASSOCIATED COMMENTS
// DELETE ROUTE - deletes the campgrounds and all its comments
router.delete("/:id", Middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err.message);
        } else {
			// if there are comments, delete comments first
			if (foundCampground.comments.length > 0) {
				foundCampground.comments.forEach((comment) => {
					Comment.findByIdAndRemove(comment, (err) => {
						if (err) {
							console.log(err.message);
						} else {
							console.log("Deleted comment from campground: " + foundCampground.name);
						}
					});
				});
			}
		}
	});
	
    Campground.findByIdAndRemove(req.params.id, (err, campground) => {
        if (err) {
	    	console.log(err.message);
            res.redirect("/campgrounds");
        } else {
			console.log("Deleted campground: " + campground.name);
    	    res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
