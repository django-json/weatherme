import { takeEvery, call, put, all } from "redux-saga/effects";

import {
	fetchDailyReadingForAddSuccess,
	fetchDailyReadingForUpdateSuccess,
	fetchDailyReadingFailure,
	setTimeRefreshed,
} from "./weather.actions";

import { WeatherActionTypes } from "./weather.types";

import { addCity, updateCity } from "../city/city.sagas";

import { getNewDateByFormat } from "../../utils/utils";

export function* fetchDailyReadingAsync({
	payload: {
		city: { id },
	},
}) {
	const apiKey = `${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
	try {
		//Fetching the API data
		const fetchWeatherForecastData = yield fetch(
			`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&APPID=${apiKey}`
		);

		const forecastDataJson = yield fetchWeatherForecastData.json();
		return { forecast: forecastDataJson };
	} catch (error) {
		return { error };
	}
}

export function* fetchDailyReadingForAddStart() {
	yield takeEvery(
		WeatherActionTypes.FETCH_DAILY_READING_FOR_ADD_START,
		fetchDailyReadingForAddStartManager
	);
}

export function* fetchDailyReadingForUpdateStart() {
	yield takeEvery(
		WeatherActionTypes.FETCH_DAILY_READING_FOR_UPDATE_START,
		fetchDailyReadingForUpdateStartManager
	);
}

//Saga Managers for adding city and updating city
export function* fetchDailyReadingForAddStartManager(action) {
	const newForecastData = yield fetchDailyReadingAsync(action);

	if (!newForecastData.error) {
		yield put(fetchDailyReadingForAddSuccess(newForecastData));
	} else {
		yield put(fetchDailyReadingFailure(newForecastData.error));
	}
}

export function* fetchDailyReadingForUpdateStartManager({
	payload: { cityIDs },
}) {
	let count, hasError;
	for (count = 0; count < cityIDs.length; count++) {
		let id = cityIDs[count];
		let updatedForecastData = yield fetchDailyReadingAsync({
			payload: { city: { id } },
		});

		if (!updatedForecastData.error) {
			yield put(fetchDailyReadingForUpdateSuccess(updatedForecastData));
		} else {
			yield put(fetchDailyReadingFailure(updatedForecastData.error));
			hasError = true;
		}
	}

	if (count === cityIDs.length && !hasError) {
		yield put(setTimeRefreshed(getNewDateByFormat("MM/DD h:mm A")));
	}
}
//Endline of Saga Managers

export function* onFetchDailyReadingForAddSuccess() {
	yield takeEvery(
		WeatherActionTypes.FETCH_DAILY_READING_FOR_ADD_SUCCESS,
		addCity
	);
}

export function* onFetchDailyReadingForUpdateSuccess() {
	yield takeEvery(
		WeatherActionTypes.FETCH_DAILY_READING_FOR_UPDATE_SUCCESS,
		updateCity
	);
}

export function* weatherSagas() {
	yield all([
		call(fetchDailyReadingForAddStart),
		call(fetchDailyReadingForUpdateStart),
		call(onFetchDailyReadingForAddSuccess),
		call(onFetchDailyReadingForUpdateSuccess),
	]);
}
