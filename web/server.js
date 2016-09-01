import express from 'express';
import bodyParser from 'body-parser';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import configureStore from './app/stores/configureStore';

import fetch from 'isomorphic-fetch';
import { match, RouterContext } from 'react-router';

import routes from './app/routes';
import constants from './app/constants';

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
 
    const config = require('./webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(3001, () => {
        console.log('webpack-dev-server is listening on port', 3001);
    });
}

const app = express();

app.set('views', './');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('*', (request, response) => {
	let store = configureStore();
	let renderRoute = (response, renderProps) => {
		let handleCreateElement = (Component, props) =>(
			<Component {...props} />
		);
		response.render('index', {
			content:renderToString(
				<Provider store={store}>
					<RouterContext createElement={handleCreateElement} {...renderProps} />
				</Provider>
			)
		});
	}
	
	
	match({routes, location:request.url}, (error, redirectLocation, renderProps) => {
    if(error){
		response.status(500).send(error.message)
    }else if(redirectLocation) {
    	response.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }else if(renderProps){
    	console.log('url : ', request.url);
		renderRoute(response, renderProps);
    }else{
		response.status(404).send(request.url)
    }
  })
});






app.listen(3000, ()=>{
	console.log('Express app listening on port 3000');
});


