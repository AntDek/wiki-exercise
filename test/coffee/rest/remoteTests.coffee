request = require "superagent"
wikiApi = require "../../../main/coffee/rest/remote"
assert = require "assert"

describe 'Remote Wiki', ->
 	describe '#findPages', ->
 		it 'should find list of pages', (done) ->
 			wikiApi.findPages "vitebsk", (err, res) ->
 				return done(err) if err
 				assert.equal "vitebsk", res[0]
				done()

	describe '#findPage', ->
		it 'should find page', (done) ->
			wikiApi.findPage "Vitebsk", (err, res) ->
				return done(err) if err
				assert.equal "string", typeof res
				done()