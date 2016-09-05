import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import ItemForm from './ItemForm';
import * as ItemActions from '../actions/item';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react-router';

class ItemAdd extends ItemForm{
	constructor(){
		super(...arguments);
		this.state = {};
	}
	handleChange(field, e){
		this.setState({[field]:e.target.value});		
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.actions.item.addItem(this.state);
	}
	handleClose(e){
		this.props.history.pushState(null, '/map');
	}
	render(){
		return(
			<ItemForm 
				draft={this.state} 
				title={'Add Item'} 
				buttonTitle={'submit'} 
				handleChange={this.handleChange.bind(this)} 
				handleSubmit={this.handleSubmit.bind(this)} 
				handleClose={this.handleClose.bind(this)} 
			/>
		);
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions:{
			item:bindActionCreators(ItemActions, dispatch),
		}
	};
}
export default connect(null, mapDispatchToProps)(ItemAdd);