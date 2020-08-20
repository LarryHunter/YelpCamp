# YelpCamp

> A Node.js web application project from the Udemy course - [The Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/)

## Live Demo

To see the app in action, go to [https://larrys-yelpcamp/](https://larrys-yelpcamp-2020.herokuapp.com)

## Features

* Authentication:
  
  * User login with username and password

* Authorization:

  * User cannot manage posts or comments without being authenticated

  * User cannot edit or delete posts or comments created by other users

* Manage campground posts with basic functionalities:

  * Read, create, edit and delete posts and comments

  * Upload campground images

* Flash messages responding to users' interaction with the app

* Responsive web design

## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/LarryHunter/YelpCamp.git
```

### Install dependencies

```sh
npm install
```

### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [moment](https://momentjs.com/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [GoormIDE](https://ide.goorm.io/)
* [Heroku](https://www.heroku.com/)

## License

#### [MIT](./LICENSE)



# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the navbar and form
* Add a navbar to all templates
* Style the new campgrounds form

# Add Mongoose
* Install and configure Mongoose
* Setup campground schema and model
* Use campground model inside of our routes!

# Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show/route template

# RESTful Routing
## Introduction
* Define REST and explain why it matters
* List all seven (7) RESTful routes
* Show example of RESTful routing in practice
### REST - A mapping between HTTP routes and CRUD

# There are 7 RESTful Routes

# Name	 URL/path	verb	description
# =================================================================================
* INDEX	 /items				GET		Displays a list of all items
* NEW	 /items/new			GET		Shows form to crete new item, then redirects
* CREATE /items				POST	Create a new item, then redirects somewhere
* SHOW	 /items/:id			GET		Shows info about a single item
* EDIT	 /items/:id/edit	GET		Shows edit form for a single item
* UPDATE /items/:id			PUT		Update a single item, then redirects somewhere
* DELETE /items/:id			DELETE	Delete a single item, then redirects somewhere

# Refactor the Mongoose code
* Create a models directory
* Use module.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment model
* Make our errors go away!
* Display comments on campground show page.

# Comment New/Create routes
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show page
* Add public directory
* Add custom stylesheets

# Auth Part 1 - Add User Model
* Install all packages needed for Auth
* Define User model

# Auth Part 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth Part 3 - Login
* Add Login template
* Add Login routes

# Auth Part 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed adding
* Add links to Navbar
* Show/hide Auth links correctly

# Auth Part 5 - Show/Hide links
* Show/hide auth links in navbar correctly

# Refactor the routes
* Use Express router to reorganize all routes

# Users and Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users and Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username & ID to the newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for campgrounds
* Add link to edit page
* Add Update Route

# Deleting Campgrounds
* Add Delete Route
* Add Delete Button

# Authorization
* User can only edit campgrounds they created
* User can only delete campgrounds they created
* Hide/Show edit and delete buttons

# Editing Comments
* Add edit route for comments
* Add edit button
* Add update route

# Deleting Comments
* Add destroy route
* Add Delete button

# Authorization Part 2: Comments
* User can only edit comments they created
* User can only delete comments they created
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash
* Demo working version
* Install and configure connect-flash
* Add Bootstrap alerts to header

# Update landing page to use animations
* Add CSS animations
* Add images to cycle on home page

# Add dynamic pricing
* Add price entry/edit fields to the 'Show' and 'Edit' layouts
* Update model and associated HTML files to display price entered by username

# Add dynamic entry times
* Update project to include moment js
* Require moment and add it to app.locals
* Update campground and comment models
* Use momoent in the show.ejs file
