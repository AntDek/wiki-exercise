var $ = require("jquery");
var Rx = require("rx-jquery");

var inputIgnoreKeys = [13, 37, 38, 39, 40];

var fetchTerm = function(input, onStart) {
	return input.keyupAsObservable() 
		.filter( function(event) {
			return inputIgnoreKeys.indexOf(event.keyCode) == -1;
		})
		.map( function(event) {
			return $(event.target).val();
		})
		.filter( function(text) {
			return text.length >= 2;
		})
		.distinctUntilChanged()
		.doAction(onStart)
		.throttle(250);
};

var remote: function(url) { return function(term) {
	return $.ajaxAsObservable({
		url: url,
		method: 'get',
		data: {query: term}
	}).map(function (data) {
		return data.data.data;
	});
} };

module.exports = function(autocompleteUrl, input, onStart) {
		return fetchTerm(input, onStart)
			.flatMapLatest(remote(autocompleteUrl));
	// },
	// pageDetail: function(pageDetailUrl) {
	// 	var doRequest = remote(pageDetailUrl);
	// 	return function(item) {
	// 		doRequest(item);
	// 	}
	// }
};