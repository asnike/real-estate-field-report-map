import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'

class App extends Component{
	render(){ 
		return(
			<div className="app-container">
				<Navigator />
				<div>
					{this.props.children}
				</div>	
			</div>
		);
	}
}



export default App;