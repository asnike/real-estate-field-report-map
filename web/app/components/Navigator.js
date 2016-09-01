import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

class Navigator extends Component{
	render(){ 
		return(
			<div className="navigator">
				<ul>
					<li><Link to="/map">map</Link></li>
				</ul>	
			</div>
		);
	}
}



export default Navigator;