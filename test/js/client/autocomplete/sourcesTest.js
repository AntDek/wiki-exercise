var env = require('jsdom').env;
var html = "<html><body><input id='test' value='test'/></body></html>";

var assert = require("assert");

describe('Autocomplete Sources', function(){
  describe('#autocomplete', function(){

	it('should return input value on keyup event', function(done){
		env(html, function (errors, window) {
			global.window = window;
			var sources = require("../../../../main/js/client/autocomplete/sources");
			var $ = require("jquery");

			var input = $("#test");
			sources.autocomplete(input, function(){})
				.subscribe(function(value) {
					assert.equal(true, value == 'test');
					done()
				});

			input.keyup();
		});
	});
  
  });
})