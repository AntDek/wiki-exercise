request = require "superagent"
Rx = require "rx"

wikiPagesUrl = "http://en.wikipedia.org/w/api.php?action=opensearch"
wikiDetailUrl = "http://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json"

module.exports =
	findPages: (term, done) ->
		request
			.get(wikiPagesUrl)
			.query(search: term)
			.end (res) ->
				return done(res.error)  if res.error
				done null, res.body

	findPage: (idPage, done) ->
		request
			.get(wikiDetailUrl)
			.query(page: idPage)
			.end (res) ->
				return done(res.body.error)  if res.body.error
				done null, res.body.parse.text["*"]