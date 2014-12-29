$ = require("jquery")
Rx = require("rx-jquery")
wikiPagesUrl = "/autocomplete"
wikiDetailUrl = "/detail"

remote = (url) -> (data, method) ->
	$.ajaxAsObservable(
		url: url
		mothod: method or "GET"
		data: data
	).map (data) ->
		data.data.data

module.exports = do ->
	apiAutocomplete = remote wikiPagesUrl
	apiDetail = remote wikiDetailUrl

	findPagesList: (term) ->
		apiAutocomplete(term: term).map (data) ->
			data[1]

	findPage: (idPage) ->
		apiDetail idPage: idPage