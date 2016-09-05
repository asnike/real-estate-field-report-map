import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import ItemList from './ItemList';

class Navigator extends Component{
	render(){ 
		return(
			<div className="navigator">
				<ul>
					<li><Link to="/map">map</Link></li>
				</ul>	
				<ItemList />
			</div>
			
		);
	}
}



export default Navigator;