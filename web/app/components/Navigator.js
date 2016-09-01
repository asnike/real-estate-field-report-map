import React, {Component, PropTypes} from 'react';

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



export default App;