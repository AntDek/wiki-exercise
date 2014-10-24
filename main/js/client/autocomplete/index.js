var $ = require('jquery');
var source = require('source');
var view = require('reusltsView');

module.exports = function(doc, apiUrl, onTermSelect) {
	var autocompleteUrl = apiUrl + '/autocomplete';
	var detailPage = apiUrl + '/detail';
	var resultsHtml = doc.find('#suggestions-list');
	var input = doc.find('#search');
	var clean = doc.find('#clean');
	view = view(input, resultsHtml, clean)

	var subs;


	source(autocompleteUrl, input, view.onStartSearch).subscribe(function(results) {
		view.appnedNewResults(results);
		if (subs) subs.dispose();
		subs = liStream(results).subscribe(onTermSelect);
		// sources.
		// resultsHtml
		// 	.off('click', 'li a')
		// 	.onAsObservable('click', 'li a')
		// 	.map(function(e){
		// 		e.preventDetail();
		// 		return $(e.target).closest('li').index() ];
		// 	})
		// 	.filter(function(index) {
		// 		return index > 0 && index < results.length;
		// 	})
		// 	.map(function(index) {
		// 		return results[index];
		// 	})
		// 	.subscribe(onTermSelect);
	});

}