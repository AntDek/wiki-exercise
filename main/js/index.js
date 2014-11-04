// require express framework
var express = require("express");

// rest server routes
var rest = require("./rest");

// create express app
var app = express()

// declare directory for static content
app.use(express.static(__dirname + "/../public"));

// attach server routes
rest(app);

// catch every requets and redirect it to index.html
app.get("/*", function(req, res) {
	res.sendFile(__dirname + "/../public/index.html");
});

// start server on port 3000
app.listen(3000, function() {
	console.log("Listening on 3000");
});