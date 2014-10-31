$ = require('jquery');

module.exports = function(input, resultsHtml, clean) {

	clean.click(function(e) {
		e.preventDefault();
		input.val(null);
		resultsHtml.hide();
	});


	var resultsToLis = function(results) {
		return results
			.map(function(item) {
				return $('<li></li>').append($('<a href="#"></a>').text(item))
			});
	}
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