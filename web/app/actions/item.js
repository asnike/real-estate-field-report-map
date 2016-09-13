import fetch from 'isomorphic-fetch';
import constants from '../constants';

export const REQUEST_ADD_ITEM = 'REQUEST_ADD_ITEM';
export const RECEIVE_ADD_ITEM_SUCCESS = 'RECEIVE_ADD_ITEM_SUCCESS';
export const RECEIVE_ADD_ITEM_ERROR = 'RECEIVE_ADD_ITEM_ERROR';

function requestAddItem(){
	return {
		type:REQUEST_ADD_ITEM,
	}
}
function receiveAddItemSuccess(result, callback){
	return {
		type:RECEIVE_ADD_ITEM_SUCCESS,
		result,
		callback,
	}
}
function receiveAddItemError(error){
	return {
		type:RECEIVE_ADD_ITEM_ERROR,
		error,
	}
}
export function addItem(item, callback){
	return dispatch => {
		dispatch(requestAddItem);
		fetch(`${constants.API_URL}/item`, {
			method:'POST',
			headers:constants.HEADERS,
			mode:'cors',
			cache:'default',
			body:JSON.stringify(item)
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(receiveAddItemError(response))
			else dispatch(receiveAddItemSuccess(response, callback));
		})
		.catch(error => dispatch(receiveAddItemError(error)));
	}
}

export const REQUEST_GET_ITEMS = 'REQUEST_GET_ITEMS';
export const RECEIVE_GET_ITEMS_SUCCESS = 'RECEIVE_GET_ITEMS_SUCCESS';
export const RECEIVE_GET_ITEMS_ERROR = 'RECEIVE_GET_ITEMS_ERROR';

function requestGetItems(){
	return {
		type:REQUEST_GET_ITEMS,
	}
}
function receiveGetItemsSuccess(result){
	return {
		type:RECEIVE_GET_ITEMS_SUCCESS,
		lists:result.lists,
	}
}
function receiveGetItemsError(error){
	return {
		type:RECEIVE_GET_ITEMS_ERROR,
		error,
	}
}
export function getItems(){
	return dispatch => {
		dispatch(requestGetItems);
		fetch(`${constants.API_URL}/items`, {
			method:'GET',
			headers:constants.HEADERS,
			mode:'cors',
			cache:'default'
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(receiveGetItemsError(response))
			else dispatch(receiveGetItemsSuccess(response));
		})
		.catch(error => dispatch(receiveGetItemsError(error)));
	}
}

