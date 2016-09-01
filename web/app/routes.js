import React from 'react';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App';
import MapView from './components/MapView';


export default (
	<Route path="/" component={App}>
		<Route path="map" component={MapView} />
	</Route>
	
)