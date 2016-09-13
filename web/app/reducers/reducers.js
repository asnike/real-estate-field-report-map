import {combineReducers} from 'redux';
import {browserHistory} from 'react-router';
import update from 'react-addons-update';

import { 
	REQUEST_ADD_ITEM, 
	REQUEST_ADD_ITEM_SUCCESS,
	REQUEST_ADD_ITEM_ERROR,
	
	REQUEST_GET_ITEMS, 
	RECEIVE_GET_ITEMS_SUCCESS,
	RECEIVE_GET_ITEMS_ERROR,
 } from '../actions/item';

function item(state={isFetching:false, lists:null}, action){
	switch(action.type){
	case REQUEST_ADD_ITEM:
		return Object.assign({}, state, {
			isFetching:true,
		}); 
	case REQUEST_ADD_ITEM_SUCCESS:
		browserHistory.pushState(null, '/map');
		return Object.assign({}, state, {
			
		}); 
	case REQUEST_ADD_ITEM_ERROR:
		browserHistory.pushState(null, '/map');
		return Object.assign({}, state, {
			
		}); 
	case REQUEST_GET_ITEMS:
		return Object.assign({}, state, {
			isFetching:true,
		}); 
	case RECEIVE_GET_ITEMS_SUCCESS:
		return Object.assign({}, state, {
			lists:action.lists,
		}); 
	case RECEIVE_GET_ITEMS_ERROR:
		return Object.assign({}, state, {
			
		}); 	
	default :
		return state;	
	}
}

function modal(state={list:[]}, action){
	switch(action.type){
	case REQUEST_ADD_ITEM_SUCCESS:
		return Object.assign({}, state, {
			list:update(state.list, {$push:[{isShowing:true, contents:'등록했습니다.', callback:action.callback}]})
		});
	case REQUEST_ADD_ITEM_ERROR:
		return Object.assign({}, state, {
			list:update(state.list, {$push:[{isShowing:true, contents:'등록실패했습니다.', callback:action.callback}]})
		});
	default :
		return state;	
	}
}

const rootReducer = combineReducers({
	item,
	modal,
})

export default rootReducer;