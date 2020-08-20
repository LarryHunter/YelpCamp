const express = require("express"),
	  passport = require("passport"),
	  User = require("../models/user"),
	  router = express.Router();

// Default route - landing page
router.get("/", (req, res) => {
	res.render("landing");
});

// REGISTRATION ROUTES
router.get("/register", (req, res) => {
	res.render("register");
});

// register POST route to save the user sign up
router.post("/register", (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            const errMessage = err.message;
			req.flash("error", errMessage);
			res.redirect("/register");
            // return res.render("register");
		} else {
	//  **** NOTE: THE ARROW FUNCTION WILL NOT WORK HERE!! IT HAS TO BE CALLED VIA function() AND NOT VIA => ****
	// 		passport.authenticate("local")(req, res => { 
			passport.authenticate("local")(req, res, function() {
				req.flash("success", "Welcome " + newUser.username + ", you have been successfully registered!")
				res.redirect("/campgrounds");
			});
		}
	});
});

// LOGIN ROUTES
router.get("/login", (req, res) => {
	res.render("login");
});

// login POST route to allow the user to sign in
router.post("/login", (req, res, next) => {
  passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome back " + req.body.username
    })(req, res);
});

// LOGOUT ROUTE
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "You are now logged out.");
	res.redirect("/campgrounds");
});

module.exports = router;
