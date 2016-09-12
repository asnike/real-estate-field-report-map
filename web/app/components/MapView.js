import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ItemActions from '../actions/item';


class MapView extends Component{
	componentWillReceiveProps(nextProps){
		
	}
	componentDidMount(){
		/*setTimeout(()=>{
			var mapOptions = {
				center: new naver.maps.LatLng(37.3595704, 127.105399),
				zoom: 10
			};
			var map = new naver.maps.Map('map', mapOptions);	
		}, 100);*/
		
		this.props.actions.item.getItems();
	}
	render(){
		return (
			<div>
				<div id="map" style={{width:'100%', height:'100vh'}} className="naver-map">map</div>	
				{this.props.children}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		items:state.items
	};
}
function mapDispatchToProps(dispatch){
	return {
		actions:{
			item:bindActionCreators(ItemActions, dispatch),
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView);