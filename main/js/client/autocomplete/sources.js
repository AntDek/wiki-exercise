var $ = require("jquery");
var Rx = require("rx-jquery");

var inputIgnoreKeys = [13, 37, 38, 39, 40];

module.exports = {
	autocomplete: function(input, onStart) {
		// create sequence on keyup event on input, that propagates input value each 250 ms
		return input
			.keyupAsObservable() 
			.filter(function(event) {
				return inputIgnoreKeys.indexOf(event.keyCode) == -1;
			})
			.map(function(event) {
				return $(event.target).val();
			})
			.filter(function(text) {
				return text.length >= 2;
			})
			.distinctUntilChanged()
			.doAction(onStart)
			.throttle(250);
	},
	itemByPosition: function(ulList, selector) {
		// create observable sequence on click on li element
		var source = ulList
			.onAsObservable('click', selector)
			.map(function(e){
				e.preventDefault();
				return $(e.target).closest('li').index();
			});
		return function(results) {
			// check index and map to item of wiki search results
			return source
				.filter(function(index) {
					return index >= 0 && index < results.length;
				})
				.map(function(index) {
					return results[index];
				});
		}
	}
}