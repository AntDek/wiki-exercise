// require jquery framework
var $ = require('jquery');

// require sources module
var sources = require('./sources');

// require view
var view = require('./view');

// require remote api provider
var restApi = require('../restApi');

module.exports = function(doc, autocompleteRemoteApi, onTermSelect) {
	var resultsHtml = doc.find('#suggestions-list');
	var input = doc.find('#search');
	var clean = doc.find('#clean');

	view = view(input, resultsHtml, clean);

	// observable sequence posts item that user selects
	var liStream = sources.itemByPosition(resultsHtml, 'li a');
	var subs;

	// observable sequence maps users input with wiki available pages
	sources.autocomplete(input, view.onStartSearch)
		.flatMapLatest(autocompleteRemoteApi)
		.subscribe(function(results) {
			view.appnedNewResults(results);
			if (subs) subs.dispose();
			subs = liStream(results).subscribe(onTermSelect);
		});

}