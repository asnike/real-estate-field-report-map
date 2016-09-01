import {combineReducers} from 'redux';

function basic(state={}, action){
	switch(action.type){
	default :
		return state;	
	}
}

const rootReducer = combineReducers({
	basic
})

export default rootReducer;