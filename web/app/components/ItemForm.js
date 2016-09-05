import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

class ItemForm extends Component{
	handleClose(e){
		e.preventDefault();
		this.props.handleClose();
	}
	render(){ 
		return(
			<div>
				<div className="panel panel-success item-form">
					<form onSubmit={this.props.handleSubmit.bind(this)}>
						<div className="panel-heading">{this.props.title}</div>
						<div className="panel-body">
							<div className="form-group">
								<label>address</label>
								<input className="form-control" type="text" onChange={this.props.handleChange.bind(this, 'addr')} 
									value={this.props.draft.addr}
								/>
							</div>	
						</div>
						<div className="panel-footer"><button className="btn btn-success">{this.props.buttonTitle}</button></div>
					</form>
				</div>
				<div className="overlay" onClick={this.handleClose.bind(this)}></div>
			</div>
		);
	}
}



export default ItemForm;