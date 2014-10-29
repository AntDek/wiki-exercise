$ = require('jquery');

module.exports = function(input, resultsHtml, clean) {

	clean.click(function(e) {
		e.preventDefault();
		input.value('');
		resultsHtml.hide();
	});


	var resultsToLis = function(results) {
		return results
			.map(function(item) {
				$('<li></li>').appned($('<a href="#"></a>').text(item))
			})
			.join('');
	}
	return {
		onStartSearch: function() {
			resultsHtml.show();
			resultsHtml.find('li').css('visibility', 'hidden');
		},
		appnedNewResults: function(results) {
			resultsHtml.html(resultsToLis(results));
		},

	}
}