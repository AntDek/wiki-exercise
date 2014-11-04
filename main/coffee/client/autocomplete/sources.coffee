$ = require "jquery"
Rx = require "rx-jquery"

inputIgnoreKeys = [13, 37, 38, 39, 40]

module.exports =
	autocomplete: (input, onStart) ->
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
		source = ulList
			.onAsObservable('click', selector)
			.map((e) ->
				e.preventDefault()
				$(e.target).closest('li').index()
			)
		(results) ->
			source
				.filter((index) ->
					index >= 0 && index < results.length
				)
				.map((index) ->
					results[index]
				)