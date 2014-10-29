var $ = require("jquery");
var autocomplete = require("./autocomplete");
var request = require("./restApi");

$(document).ready(function(){
	var doc = $(document);
	var detail = doc.find("#results");

	var onPageSelect = function(page) {
		request
			.findPage(page)
			.subscribe(function(html){
				detail.html(html);
		});
	}

	autocomplete(doc, request.findPagesList, onPageSelect);
});