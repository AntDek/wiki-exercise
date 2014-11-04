// require function fore remote comunication
var remote = require("./remote");

module.exports = function(app) {

	// response handler
	var processResponse = function(res) { return function(err, data) {
		if (err) {
			return res.json({error: err});
		}
		return res.json({data: data});
	}}

	// create route for autocomplete
	app.get("/autocomplete", function(req, res) {
		var term = req.param("term");
		remote.findPages(term, processResponse(res))
	});

	// create route for page detail
	app.get("/detail", function(req, res) {
		var idPage = req.param("idPage");
		remote.findPage(idPage, processResponse(res));
	});
}