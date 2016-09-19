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
				position: new naver.maps.LatLng(item.lat, item.lon),
				map: this.state.map
			});
			var content = [
				'<div>',
					'<h3>'+item.addr+'</h3>',
					'<p>'+item.addr+'</p>',
				'</div>'
			].join('');
			var infoWindow = new naver.maps.InfoWindow({
				content:content	
			});
			infoWindow.open(map, this.state.marker);
		})
		
	}
	componentDidMount(){
		setTimeout(()=>{
			var mapOptions = {
				center: new naver.maps.LatLng(37.5450782, 126.9451998),
				zoom: 10
			};
			this.setState({
				map:new naver.maps.Map('map', mapOptions)
			});
			console.log('map set');
			this.props.actions.item.getItems();
		}, 100);
		console.log('mount');
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