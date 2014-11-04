// require jquery framework
var $ = require('jquery');

module.exports = function(input, resultsHtml, clean) {

	// register function on click event
	clean.click(function(e) {
		e.preventDefault();
		input.val(null);
		resultsHtml.hide();
	});


	// map results to html code
	var resultsToLis = function(results) {
		return results
			.map(function(item) {
				return $('<li></li>').append($('<a href="#"></a>').text(item))
			});
	}
	// provide public methods
	return {
		onStartSearch: function() {
			resultsHtml.show();
			resultsHtml.find('li').css('visibility', 'hidden');
		},
		appnedNewResults: function(results) {
			resultsHtml.html('');
			resultsHtml.append(resultsToLis(results));
		},

	}
}