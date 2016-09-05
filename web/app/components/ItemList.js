import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class ItemList extends Component{
	render(){ 
		return(
			<div>
				<div className="btn btn-primary"><Link to="/map/add">add</Link></div>
				<ul>
					<li></li>
				</ul>
			</div>
		);
	}
}



export default ItemList;