$ = require('jquery');

module.exports = function(suggestionsSource, input, resultsHtml, clean) {

	resultsHtml.on('li a', 'click', function(e) {
		e.preventDefault();
	});

	clean.click(function(e) {
		e.preventDefault();
		input.value('');
		resultsHtml.hide();
	});

	var resultsToLi = function(results) {
		results.map(function(item) {
			$('<li></li>').appned($('<a href="#"></a>').text(item));
		});
	};

	var onStartSearch = function() {
		resultsHtml.show();
		resultsHtml.find('li').css('visibility', 'hidden');
	}

	suggestionsSource(input, onStartSearch).subscribe(function(results) {
		resultsHtml.html(resultsList(resultsToLi(results)));
	});
}