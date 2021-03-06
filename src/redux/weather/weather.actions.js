import { WeatherActionTypes } from "./weather.types";

export const fetchDailyReadingForAddStart = (id) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_FOR_ADD_START,
	payload: { city: { id } },
});

export const fetchDailyReadingForUpdateStart = (cityIDs) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_FOR_UPDATE_START,
	payload: { cityIDs },
});

export const setTimeRefreshed = (timeRefreshed) => ({
	type: WeatherActionTypes.SET_TIME_REFRESHED,
	payload: timeRefreshed,
});

export const resetTimeRefreshed = () => ({
	type: WeatherActionTypes.RESET_TIME_REFRESHED,
});

export const fetchDailyReadingForAddSuccess = ({ forecast }) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_FOR_ADD_SUCCESS,
	payload: { forecast },
});

export const fetchDailyReadingForUpdateSuccess = ({ forecast }) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_FOR_UPDATE_SUCCESS,
	payload: { forecast },
});

export const fetchDailyReadingSuccess = ({ forecast }) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_SUCCESS,
	payload: { forecast },
});

export const fetchDailyReadingFailure = (error) => ({
	type: WeatherActionTypes.FETCH_DAILY_READING_FAILURE,
	payload: error.message,
});

// //Thunk function
// export const fetchDailyReadingStartAsync = (city = "Cagayan de Oro") => {
// 	return async (dispatch) => {
// 		try {
// 			//Dispatching the fetchDailyReadingStart action to update the weatherReducer's "isFetching" state to true
// 			dispatch(fetchDailyReadingStart());

// 			//Fetching the API data
// 			const fetchData = await fetch(
// 				`http://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(
// 					city
// 				)}&units=imperial&APPID=${
// 					process.env.REACT_APP_OPEN_WEATHER_API_KEY
// 				}`
// 			);

// 			const responseJson = await fetchData.json();

// 			//Dispatching fetchDailyReadingSuccess action to update weatherReducer with the payload
// 			dispatch(fetchDailyReadingSuccess(responseJson));
// 		} catch (error) {
// 			//Dispatching fetchDailyReadingFailure action when data fetching fails
// 			dispatch(fetchDailyReadingFailure(error));
// 		}
// 	};
// };
