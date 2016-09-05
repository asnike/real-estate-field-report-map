import React from 'react';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App';
import MapView from './components/MapView';
import ItemAdd from './components/ItemAdd';


export default (
	<Route path="/" component={App}>
		<Route path="map" component={MapView}>
			<Route path="add" component={ItemAdd} />
		</Route>
	</Route>
	
)