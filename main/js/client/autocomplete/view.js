// require jquery framework
var $ = require('jquery');

module.exports = function(input, resultsHtml, cleanButton) {

	// register function on click event
	cleanButton.click(function(e) {
		e.preventDefault();
		input.val(null);
		resultsHtml.hide();
	});


	var resultsToLis = function(results) {
		// map results to html code
		return results
			.map(function(item) {
				return $('<li></li>').append($('<a href="#"></a>').text(item))
			});
	}
	// provide public methods
	return {
		onStartSearch: function() {
			// hide previous results
			resultsHtml.find('li').css('visibility', 'hidden');
			// show results placeholder
			resultsHtml.show();
		},
		appnedNewResults: function(results) {
			// remove previous results
			resultsHtml.html('');
			// append new results
			resultsHtml.append(resultsToLis(results));
		}
	}
}