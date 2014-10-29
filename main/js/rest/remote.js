var request = require("superagent");
var Rx = require("rx");

var wikiPagesUrl = "http://en.wikipedia.org/w/api.php?action=opensearch";
var wikiDetailUrl = "http://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json";

module.exports = {
	findPages: function(term, done) {
		request
			.get(wikiPagesUrl)
			.query({search: term})
			.end(function(res) {
				if (res.error) return done(res.error);
				done(null, res.body);
			})
	},
	findPage: function(idPage, done) {
		request
			.get(wikiDetailUrl)
			.query({page: idPage})
			.end(function(res) {
				if (res.error) return done(res.error);
				done(null, res.body.parse.text["*"]);
			})
	}
}