const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
	{
		name: "Carlsbad State Beach",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaz6NXb0tzvEA21KzVSlOuHB38T2vWlvYZ4f-fT7AhBi9VJ9YJ&usqp=CAU",
		description: "Ocean side camping. Beautiful cliffs, bathrooms, showers, stairs to the beach."
	}
]

function seedDb() {
	// Remove all campgrounds
	Campground.deleteMany({}, (err) => {
		if (err) {
			console.log (err.message);
		} else {
			console.log ("Deleted all campgrounds from the database!");
		}
		
		// // Add a few default campgrounds
		// data.forEach((seed) => {
		// 	Campground.create(seed, (err, campground) => {
		// 		if (err) {
		// 			console.log (err);
		// 		} else {
		// 			console.log ("Added seed campground value: " + campground.name);
					
		// 			// Add a few comments
		// 			Comment.create({
		// 				text: "This place is really great, but I wish there was internet.",
		// 				author: "Homer"
		// 			}, (err, comment) => {
		// 				if (err) {
		// 					console.log(err);
		// 				} else {
		// 					campground.comments.push(comment);
		// 					campground.save();
							
		// 					console.log ("Added campground comment: " + comment.text);
		// 				}
		// 			});
		// 		}
		// 	});
		// });
	});
}

module.exports = seedDb;
