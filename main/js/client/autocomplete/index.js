var $ = require('jquery');
var sources = require('./sources');
var view = require('./reusltsView');
var restApi = require('../restApi');

module.exports = function(doc, autocompleteRemoteApi, onTermSelect) {
	var resultsHtml = doc.find('#suggestions-list');
	var input = doc.find('#search');
	var clean = doc.find('#clean');

	view = view(input, resultsHtml, clean);

	var liStream = sources.itemByPosition(resultsHtml, 'li a');
	var subs;

	sources.autocomplete(input, view.onStartSearch)
		.faltMapLatest(function(term) {
			return autocompleteRemoteApi({query: term});
		})
		.subscribe(function(results) {
			view.appnedNewResults(results);
			if (subs) subs.dispose();
			subs = liStream(results).subscribe(onTermSelect);
		});

}