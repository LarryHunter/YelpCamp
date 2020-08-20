const express = require("express"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  flash = require('connect-flash'),
	  bodyParser = require("body-parser"),
	  LocalStrategy = require("passport-local"),
	  methodOverride = require("method-override"),
	  User = require("./models/user"),
	  SeedDb = require("./seeds");

// Add route files as dependencies
const campgroundRoutes = require("./routes/campgrounds"),
	  commentRoutes = require("./routes/comments"),
	  authRoutes = require("./routes/auth");

// Connect to the mongo DB via mongoose *NOTE: if database does not exist, it will be created.
// Local Goorm URL for the database

const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/yelp_camp";

// URL to use for the depolyed version on Heroku
mongoose.connect(databaseUrl, {
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false 
})
	.then(() => console.log("Successfully connected to the YelpCamp database!"))
	.catch(err => console.log("ERROR:" + err.message));

// Use the included libraries
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "YelpCamp is a totally fictional campground site with comments",
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.flashSuccessMessage = req.flash("success");
	res.locals.flashErrorMessage = req.flash("error");
	next();
});

// Requiring routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);

// Clean and re-seed the database
//SeedDb();

// This is the 'catch all' response for anything that is not found.
app.get('*', (req, res) => res.send("Error 404 - Page not found..."));

// Tell Express to listen for requests (start server)
const port = process.env.PORT || 3000;
app.listen(port, function() { 	
	console.log("YelpCamp server has started and listening on port: " + port);
});
