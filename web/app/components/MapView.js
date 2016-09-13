import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ItemActions from '../actions/item';


class MapView extends Component{
	constructor(){
		super(...arguments);
		this.state = {
			map:null	
		}
	}
	componentWillReceiveProps(nextProps){
		console.log('receive ::', nextProps);
		
		nextProps.item.lists.map((item) => {
			var marker = new naver.maps.Marker({
				position: new naver.maps.LatLng(map.lat, map.lon),
				map: this.state.map
			});
		})
		
	}
	componentDidMount(){
		setTimeout(()=>{
			var mapOptions = {
				center: new naver.maps.LatLng(37.3595704, 127.105399),
				zoom: 10
			};
			this.setState({
				map:new naver.maps.Map('map', mapOptions)
			});
		}, 100);
		console.log('mount');
		this.props.actions.item.getItems();
	}
	render(){
		return (
			<div>
				<div id="map" style={{width:'100vw', height:'100vh'}} className="naver-map">map</div>	
				{this.props.children}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		item:state.item
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