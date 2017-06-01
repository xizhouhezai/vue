'use strict';

var Express = require('express'),
	Resource = require('express-resource'),
	app = new Express();

app.resource(require('./routes/index'));
app.resource('categories', require('./routes/category'));
app.resource('articles', require('./routes/article'));

var server = app.listen(8088, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server listening at http://%s:%s', host, port);
});