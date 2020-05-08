import { CityActionTypes } from "./city.types";

import { formatCitySearchResults } from "./city.utils";

const INITIAL_STATE = {
	cities: [],
	isFetchingCity: false,
	citySearchResults: null,
	error: "",
};

const cityReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CityActionTypes.SET_CITY:
			return {
				...state,
				cities: [...state.cities, action.payload],
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
				citySearchResults: formatCitySearchResults(action.payload),
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
