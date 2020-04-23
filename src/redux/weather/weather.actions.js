import { WeatherActionTypes } from "./weather.types";

export const fetchDailyReadingStart = () => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_START,
});

export const fetchDailyReadingSuccess = (reading) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_SUCCESS,
	payload: reading,
});

export const fetchDailyReadingFailure = (error) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_FAILURE,
	payload: error.message,
});

//Thunk function
export const fetchDailyReadingStartAsync = (city = "Cagayan de Oro") => {
	return async (dispatch) => {
		try {
			//Dispatching the fetchDailyReadingStart action to update the weatherReducer's "isFetching" state to true
			dispatch(fetchDailyReadingStart());

			//Fetching the API data
			const fetchData = await fetch(
				`http://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(
					city
				)}&units=imperial&APPID=${
					process.env.REACT_APP_OPEN_WEATHER_API_KEY
				}`
			);

			const responseJson = await fetchData.json();

			//Dispatching fetchDailyReadingSuccess action to update weatherReducer with the payload
			dispatch(fetchDailyReadingSuccess(responseJson));
		} catch (error) {
			//Dispatching fetchDailyReadingFailure action when data fetching fails
			dispatch(fetchDailyReadingFailure(error));
		}
	};
};
