import { takeLatest, takeEvery, call, put, all } from "redux-saga/effects";

import {
	fetchDailyReadingSuccess,
	fetchDailyReadingFailure,
} from "./weather.actions";

import { addCityWithData } from "../city/city.actions";

import { WeatherActionTypes } from "./weather.types";

function* fetchDailyReadingAsync({
	payload: {
		city: { id },
	},
}) {
	const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
	try {
		//Fetching the API data

		const fetchCurrentWeatherData = yield fetch(
			`http://api.openweathermap.org/data/2.5/weather?id=${id}&units=imperial&APPID=${apiKey}`
		);
		const fetchWeatherForecastData = yield fetch(
			`http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&APPID=${apiKey}`
		);

		const forecastDataJson = yield fetchWeatherForecastData.json();
		const currentDataJson = yield fetchCurrentWeatherData.json();
		//Dispatching fetchDailyReadingSuccess action to update weatherReducer with the payload
		yield put(
			fetchDailyReadingSuccess({
				forecast: forecastDataJson,
				current: currentDataJson,
			})
		);
	} catch (error) {
		//Dispatching fetchDailyReadingFailure action when data fetching fails
		yield put(fetchDailyReadingFailure(error));
	}
}

function* addNewCity({ payload }) {
	yield put(addCityWithData(payload));
}

export function* fetchDailyReadingStart() {
	yield takeLatest(
		WeatherActionTypes.FETCH_DAILY_READING_START,
		fetchDailyReadingAsync
	);
}

export function* onFetchDailyReadingSuccess() {
	yield takeEvery(WeatherActionTypes.FETCH_DAILY_READING_SUCCESS, addNewCity);
}

export function* weatherSagas() {
	yield all([call(fetchDailyReadingStart), call(onFetchDailyReadingSuccess)]);
}
