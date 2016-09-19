import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ItemActions from '../actions/item';


class MapView extends Component{
	constructor(){
		super(...arguments);
		this.state = {
			map:null,
			infoWindow:null,
		}
	}
	componentWillReceiveProps(nextProps){
		console.log('receive ::', nextProps);
		
		nextProps.item.lists.map((item) => {
			var marker = new naver.maps.Marker({
				position: new naver.maps.LatLng(item.lat, item.lon),
				map: this.state.map
			});
			naver.maps.Event.addListener(marker, 'click', this.makerClick.bind(this));
		})
		
	}
	makerClick(e){
		console.log(e);
		var obj = this.props.item.lists.find(item=> item.lat == e.overlay.position._lat && item.lon == e.overlay.position._lng);
		var content = [
			'<div class="info-window">',
				'<h3>'+obj.addr+'</h3>',
				'<p>'+obj.addr+'</p>',
			'</div>'
		].join('');
		
		
		if(this.state.infoWindow && this.state.infoWindow.getMap()) this.state.infoWindow.close();
		this.state.infoWindow = new naver.maps.InfoWindow({content:content});
		this.state.infoWindow.open(this.state.map, e.overlay.position);
		
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
				<div id="map" style={{width:'100px', height:'100px'}} className="naver-map">map</div>	
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