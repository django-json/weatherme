import { CityActionTypes } from "./city.types";

export const setCity = (value) => ({
	type: CityActionTypes.SET_CITY,
	payload: value,
});

export const fetchCityStart = () => ({
	type: CityActionTypes.FETCH_CITY_START,
});

export const fetchCitySuccess = (city) => ({
	type: CityActionTypes.FETCH_CITY_SUCCESS,
	payload: city,
});

export const fetchCityFailure = (error) => ({
	type: CityActionTypes.FETCH_CITY_FAILURE,
	payload: error.message,
});

//thunk function to start fetching city data asynchronously
export const fetchCityStartAsync = (city) => {
	return async (dispatch) => {
		try {
			dispatch(fetchCityStart());

			const cityData = await fetch(
				`https://api.teleport.org/api/cities/?search=${encodeURI(city)}`
			);

			const responseJson = await cityData.json();
			dispatch(fetchCitySuccess(responseJson));
		} catch (error) {
			dispatch(fetchCityFailure(error));
		}
	};
};
