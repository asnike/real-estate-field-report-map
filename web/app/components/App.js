import React, {Component, PropTypes} from 'react';
import Navigator from './Navigator';

class App extends Component{
	render(){ 
		return(
			<div className="app-container">
				<Navigator />
				<div className="work-container">
					{this.props.children}
				</div>	
			</div>
		);
	}
}



export default App;