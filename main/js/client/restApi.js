var $ = require("jquery");
var Rx = require("rx-jquery");

var wikiPagesUrl = "/autocomplete";
var wikiDetailUrl = "/detail";

var remote = function(url) { return function(data, method) {
	return $.ajaxAsObservable({
		url: url,
		mothod: method || "GET",
		data: data
	}).map(function (data) {
		return data.data.data;
	});
}}

module.exports = (function() {
	apiAutocomplete = remote(wikiPagesUrl);
	apiDetail = remote(wikiDetailUrl);
	return {
		findPagesList: function(term) {
			return apiAutocomplete({term: term})
				.map(function(data) {
					return data[1];
				});
		},
		findPage: function(idPage) {
			return apiDetail({idPage: idPage});
		}
	}
})();