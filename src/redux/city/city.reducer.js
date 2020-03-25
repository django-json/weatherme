import { CityActionTypes } from './city.types';

const INITIAL_STATE = {
	city: ""
};

const cityReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case CityActionTypes.SET_CITY:
			return {
				...state,
				city: action.payload
			}
		default:
			return state
	}
};

export default cityReducer;