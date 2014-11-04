// require jquery framework
var $ = require("jquery");

// require autocomplete module
var autocomplete = require("./autocomplete");

// require remote api provider
var request = require("./restApi");

// run client app when document will be ready
$(document).ready(function(){
	var doc = $(document);
	var detail = doc.find("#results");

	// when user selects item from autocomplete
	// this function will be fired
	var onPageSelect = function(page) {
		// create observable sequence for remote call
		request
			.findPage(page)
			.subscribe(function(html){
				detail.html(html); //pass page html to document
		});
	}

	// configurate autocomplete
	autocomplete(doc, request.findPagesList, onPageSelect);
});