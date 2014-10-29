var $ = require("jquery");
var Rx = require("rx-jquery");

var inputIgnoreKeys = [13, 37, 38, 39, 40];

module.exports = {
	autocomplete: function(input, onStart) {
		return input
			.keyupAsObservable() 
			.filter( function(event) {
				return inputIgnoreKeys.indexOf(event.keyCode) == -1;
			})
			.map( function(event) {
				return $(event.target).val();
			})
			.filter( function(text) {
				return text.length >= 2;
			})
			.distinctUntilChanged()
			.doAction(onStart)
			.throttle(250);
	},
	itemByPosition: function(ulList, selector) {
		var source = ulList
			.onAsObservable('click', selector)
			.map(function(e){
				e.preventDetail();
				return $(e.target).closest('li').index();
			});
		return function(results) {
			return source
				.filter(function(index) {
					return index > 0 && index < results.length;
				})
				.map(function(index) {
					return results[index];
				});
		}

	}
}