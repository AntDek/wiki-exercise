$ = require "jquery"
Rx = require "rx-jquery"

inputIgnoreKeys = [13, 37, 38, 39, 40]

module.exports =
	autocomplete: (input, onStart) ->
		# create sequence on keyup event on input, that propagates input value each 250 ms
		input
			.keyupAsObservable() 
			.filter((event) ->
				inputIgnoreKeys.indexOf(event.keyCode) == -1
			)
			.map((event) ->
				$(event.target).val()
			)
			.filter((text) ->
				text.length >= 2
			)
			.distinctUntilChanged()
			.doAction(onStart)
			.throttle(250)

	itemByPosition: (ulList, selector) ->
		# create observable sequence on click on li element
		source = ulList
			.onAsObservable('click', selector)
			.map((e) ->
				e.preventDefault()
				$(e.target).closest('li').index()
			)
		(results) ->
			# check index and map to item of wiki search results
			source
				.filter((index) ->
					index >= 0 && index < results.length
				)
				.map((index) ->
					results[index]
				)