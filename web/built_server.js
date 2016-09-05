'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRedux = require('react-redux');

var _configureStore = require('./app/stores/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouter = require('react-router');

var _routes = require('./app/routes');

var _routes2 = _interopRequireDefault(_routes);

var _constants = require('./app/constants');

var _constants2 = _interopRequireDefault(_constants);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Item = require('./app/schemas/Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV == 'development') {
	console.log('Server is running on development mode');

	var config = require('./webpack.dev.config');
	var compiler = (0, _webpack2.default)(config);
	var devServer = new _webpackDevServer2.default(compiler, config.devServer);
	devServer.listen(3001, function () {
		console.log('webpack-dev-server is listening on port', 3001);
	});
}


var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
	console.log('Connected to mongodb server');
});

_mongoose2.default.connect('mongodb://auction:10904a@104.238.181.94:27017/auction');

var app = (0, _express2.default)();

app.set('views', './');
app.set('view engine', 'ejs');

app.use(_express2.default.static(__dirname + '/public'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.get('/api/items', function (request, response) {
	_Item2.default.find(function (error, items) {
		if (error) return response.status(500).send({ error: 'database failure' });
		response.json(items);
	});
});

app.post('/api/item', function (request, response) {
	var item = new _Item2.default();
	console.log('body :: ', request.body);

	item.addr = request.body.addr;
	/*item._member = response.member._id;
 console.log('after middleware member :: ', response.member._id);*/

	item.save(function (error) {
		if (error) {
			console.error(error);
			response.json({ result: 0 });
			return;
		}
		response.json({ result: 1 });
	});
});

app.get('*', function (request, response) {
	var store = (0, _configureStore2.default)();
	var renderRoute = function renderRoute(response, renderProps) {
		var handleCreateElement = function handleCreateElement(Component, props) {
			return _react2.default.createElement(Component, props);
		};
		response.render('index', {
			content: (0, _server.renderToString)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(_reactRouter.RouterContext, _extends({ createElement: handleCreateElement }, renderProps))
			))
		});
	};

	(0, _reactRouter.match)({ routes: _routes2.default, location: request.url }, function (error, redirectLocation, renderProps) {
		if (error) {
			response.status(500).send(error.message);
		} else if (redirectLocation) {
			response.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			console.log('url : ', request.url);
			renderRoute(response, renderProps);
		} else {
			response.status(404).send(request.url);
		}
	});
});

app.listen(3000, function () {
	console.log('Express app listening on port 3000');
});
