var request = require("superagent");
var wikiApi = require("../../../main/js/rest/remote");
var assert = require("assert");


describe('Remote Wiki', function(){
	describe('#findPages', function(){
		it('should find list of pages', function(done){
			wikiApi.findPages("vitebsk", function(err, res) {
				if (err) return done(err);
				assert.equal("vitebsk", res[0]);
				done();
			});
		})
	});

	describe('#findPage', function() {
		it('should find page', function(done){
			wikiApi.findPage("Vitebsk", function(err, res) {
				if (err) return done(err);
				assert.equal("string", typeof res);
				done();
			});
		})
	});
});