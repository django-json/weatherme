import { takeEvery, call, put, all } from "redux-saga/effects";

import {
	fetchDailyReadingSuccess,
	fetchDailyReadingFailure,
} from "./weather.actions";

import { WeatherActionTypes } from "./weather.types";
import { CityActionTypes } from "../city/city.types";

export function* fetchDailyReadingAsync({ payload: { city } }) {
	try {
		//Fetching the API data
		const fetchData = yield fetch(
			`http://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(
				city
			)}&units=imperial&APPID=${
				process.env.REACT_APP_OPEN_WEATHER_API_KEY
			}`
		);

		const responseJson = yield fetchData.json();

		//Dispatching fetchDailyReadingSuccess action to update weatherReducer with the payload
		yield put(fetchDailyReadingSuccess(responseJson));
	} catch (error) {
		//Dispatching fetchDailyReadingFailure action when data fetching fails
		yield put(fetchDailyReadingFailure(error));
	}
}

export function* fetchDailyReadingStart() {
	yield takeEvery(
		WeatherActionTypes.FETCH_DAILY_READING_START,
		fetchDailyReadingAsync
	);
}

export function* weatherSagas() {
	yield all([call(fetchDailyReadingStart)]);
}
