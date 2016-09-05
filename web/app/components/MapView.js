import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MapActions from '../actions/map';


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
		
		//this.props.actions.map.fetchMapData();
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
		map:state.map
	};
}
function mapDispatchToProps(dispatch){
	return {
		actions:{
			map:bindActionCreators(MapActions, dispatch),
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView);