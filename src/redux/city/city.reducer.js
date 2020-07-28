import { CityActionTypes } from "./city.types";

import { formatCitySearchResults } from "./city.utils";
import { filterDailyReading } from "../weather/weather.utils.js";
import { removeCity, updateCity } from "../city/city.utils.js";

const INITIAL_STATE = {
	cities: [],
	isFetchingCity: false,
	citySearchResults: null,
	error: "",
	caretToggle: false,
};

const cityReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CityActionTypes.ADD_CITY_WITH_DATA:
			return {
				...state,
				cities: [...state.cities, filterDailyReading(action.payload)],
			};
		case CityActionTypes.UPDATE_CITY_WITH_DATA:
			return {
				...state,
				cities: updateCity(
					state.cities,
					filterDailyReading(action.payload)
				),
			};
		case CityActionTypes.DELETE_CITY:
			return {
				...state,
				cities: removeCity(state.cities, action.payload),
			};
		case CityActionTypes.FETCH_CITY_START:
			return {
				...state,
				isFetchingCity: true,
				error: "",
			};
		case CityActionTypes.FETCH_CITY_SUCCESS:
			return {
				...state,
				isFetchingCity: false,
				citySearchResults: formatCitySearchResults(action.payload),
				caretToggle: true,
			};
		case CityActionTypes.FETCH_CITY_FAILURE:
			return {
				...state,
				isFetchingCity: false,
				error: action.payload,
			};
		case CityActionTypes.TOGGLE_CARET:
			return {
				...state,
				caretToggle: !state.caretToggle,
			};
		default:
			return state;
	}
};

export default cityReducer;
