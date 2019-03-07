var express = require("express"),
    path = require("path");

// setup the express app
var app = express(),
    PORT = process.env.PORT || 3000;

// setup the express app to handle data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public')); // this is the server's root folder

// app router
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// starts the server and begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});