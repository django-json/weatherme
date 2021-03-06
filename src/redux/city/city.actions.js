import { CityActionTypes } from "./city.types";

export const addCityWithData = (value) => ({
	type: CityActionTypes.ADD_CITY_WITH_DATA,
	payload: value,
});

export const updateCityWithData = (value) => ({
	type: CityActionTypes.UPDATE_CITY_WITH_DATA,
	payload: value,
});

export const deleteCity = (id) => ({
	type: CityActionTypes.DELETE_CITY,
	payload: id,
});

export const fetchCityStart = (city) => ({
	type: CityActionTypes.FETCH_CITY_START,
	payload: { city: city },
});

export const fetchCitySuccess = (city) => ({
	type: CityActionTypes.FETCH_CITY_SUCCESS,
	payload: city,
});

export const fetchCityFailure = (error) => ({
	type: CityActionTypes.FETCH_CITY_FAILURE,
	payload: error.message,
});

export const toggleCaret = () => ({
	type: CityActionTypes.TOGGLE_CARET,
});

// //thunk function to start fetching city data asynchronously
// export const fetchCityStartAsync = (city) => {
// 	return async (dispatch) => {
// 		try {
// 			dispatch(fetchCityStart());

// 			const cityData = await fetch(
// 				`https://api.teleport.org/api/cities/?search=${encodeURI(city)}`
// 			);

// 			const responseJson = await cityData.json();
// 			dispatch(fetchCitySuccess(responseJson));
// 		} catch (error) {
// 			dispatch(fetchCityFailure(error));
// 		}
// 	};
// };
