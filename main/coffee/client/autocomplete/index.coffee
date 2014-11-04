# require jquery framework
$ = require "jquery"

# require sources module
sources = require "./sources.coffee"

# require view
view = require "./view"

# require remote api provider
restApi = require "../restApi"

module.exports = (doc, autocompleteRemoteApi, onTermSelect) ->
	resultsHtml = doc.find "#suggestions-list"
	input = doc.find "#search"
	clean = doc.find "#clean"

	view = view input, resultsHtml, clean

	# observable sequence posts item that user selects
	liStream = sources.itemByPosition resultsHtml, "li a"
	subs

	# observable sequence maps users input with wiki available pages
	sources.autocomplete(input, view.onStartSearch)
		.flatMapLatest(autocompleteRemoteApi)
		.subscribe((results) ->
			view.appnedNewResults results
			subs.dispose() if subs
			subs = liStream(results).subscribe onTermSelect
		)