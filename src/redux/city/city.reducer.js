import { CityActionTypes } from "./city.types";

const INITIAL_STATE = {
	city: "",
	isFetchingCity: false,
	cityFetchingResult: null,
	error: "",
};

const cityReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CityActionTypes.SET_CITY:
			return {
				...state,
				city: action.payload,
			};
		case CityActionTypes.FETCH_CITY_START:
			return {
				...state,
				isFetchingCity: true,
			};
		case CityActionTypes.FETCH_CITY_SUCCESS:
			return {
				...state,
				isFetchingCity: false,
				cityFetchingResult: action.payload,
			};
		case CityActionTypes.FETCH_CITY_FAILURE:
			return {
				...state,
				isFetchingCity: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default cityReducer;
