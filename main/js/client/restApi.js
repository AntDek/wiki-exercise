var $ = require("jquery");
var Rx = require("rx-jquery");

var wikiPagesUrl = "/autcomplete"
var wikiDetailUrl = "/detail"

var remote = function(url) { function(data, method) {
	$.ajaxAsObservable({
		url: url,
		mothod: method || "GET",
		data: data
	}).map(function (data) {
		return data.data;
	});
}}

module.exports = (function() {
	apiAutocomplete = remote(wikiPagesUrl);
	apiDetail = remote(wikiDetailUrl);
	return {
		findPagesList: function(term) {
			return apiAutocomplete({term: term});
		},
		findPage: function(idPage) {
			return apiDetail({idPage: idPage});
		}
	}
})();