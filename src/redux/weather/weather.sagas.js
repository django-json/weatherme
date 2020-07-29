import { take, takeEvery, call, put, all } from "redux-saga/effects";

import {
	fetchDailyReadingForAddSuccess,
	fetchDailyReadingForUpdateSuccess,
	fetchDailyReadingFailure,
	setTimeRefreshed,
} from "./weather.actions";

import { WeatherActionTypes } from "./weather.types";

import { addCity, updateCity } from "../city/city.sagas";

import { getNewDateByFormat } from "../../utils/utils";

// export function* fetchDailyReadingAsync({
// 	payload: {
// 		city: { id },
// 	},
// }) {
// 	const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
// 	try {
// 		//Fetching the API data
// 		const fetchWeatherForecastData = yield fetch(
// 			`http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&APPID=${apiKey}`
// 		);

// 		const forecastDataJson = yield fetchWeatherForecastData.json();
// 		//Dispatching fetchDailyReadingSuccess action to update weatherReducer with the payload
// 		yield put(
// 			fetchDailyReadingSuccess({
// 				forecast: forecastDataJson,
// 			})
// 		);
// 	} catch (error) {
// 		//Dispatching fetchDailyReadingFailure action when data fetching fails
// 		yield put(fetchDailyReadingFailure(error));
// 	}
// }

export function* fetchDailyReadingAsync({
	payload: {
		city: { id },
	},
}) {
	const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
	try {
		//Fetching the API data
		const fetchWeatherForecastData = yield fetch(
			`http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&APPID=${apiKey}`
		);

		const forecastDataJson = yield fetchWeatherForecastData.json();
		return { forecast: forecastDataJson };
	} catch (error) {
		return { error };
	}
}

export function* fetchDailyReadingStart() {
	yield takeEvery(
		WeatherActionTypes.FETCH_DAILY_READING_START,
		fetchDailyReadingAsync
	);
}

//City Saga Managers for adding city and updating city
export function* fetchDailyReadingForAddStart() {
	const action = yield take(
		WeatherActionTypes.FETCH_DAILY_READING_FOR_ADD_START
	);
	const newForecastData = yield call(fetchDailyReadingAsync, action);

	if (!newForecastData.error) {
		yield put(fetchDailyReadingForAddSuccess(newForecastData));
	} else {
		yield put(fetchDailyReadingFailure(newForecastData.error));
	}
}

export function* fetchDailyReadingForUpdateStart() {
	const {
		payload: { cityIDs },
	} = yield take(WeatherActionTypes.FETCH_DAILY_READING_FOR_UPDATE_START);

	let count;
	for (count = 0; count < cityIDs.length; count++) {
		let id = cityIDs[count];
		let updatedForecastData = yield call(fetchDailyReadingAsync, {
			payload: { city: { id } },
		});

		if (!updatedForecastData.error) {
			yield put(fetchDailyReadingForUpdateSuccess(updatedForecastData));
		} else {
			yield put(fetchDailyReadingFailure(updatedForecastData.error));
		}
	}

	if (count === cityIDs.length) {
		yield put(setTimeRefreshed(getNewDateByFormat("MM/DD h:mm A")));
	}
}
//Endline of City Saga Managers

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
		call(fetchDailyReadingStart),
		call(fetchDailyReadingForAddStart),
		call(fetchDailyReadingForUpdateStart),
		call(onFetchDailyReadingForAddSuccess),
		call(onFetchDailyReadingForUpdateSuccess),
	]);
}
