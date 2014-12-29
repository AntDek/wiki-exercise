env = require('jsdom').env
html = "<html><body><input id='test' value='test'/></body></html>"

assert = require "assert"

describe 'Autocomplete Sources', ->
	describe '#autocomplete', ->
		it 'should return input value on keyup event', (done) ->
			env html, (errors, window) ->
				global.window = window
				sources = require "../../../../main/js/client/autocomplete/sources"
				$ = require "jquery"

				input = $("#test")
				sources.autocomplete(input, ()->)
					.subscribe (value) ->
						assert.equal true, value == 'test'
						done()

				input.keyup()