import { takeEvery, call, put, all } from "redux-saga/effects";

import { fetchCitySuccess, fetchCityFailure } from "./city.actions";

import { CityActionTypes } from "./city.types";

export function* fetchCityStartAsync({ payload: { city } }) {
	try {
		const cityData = yield fetch(
			`https://api.teleport.org/api/cities/?search=${encodeURI(city)}`
		);

		const responseJson = yield cityData.json();
		yield put(fetchCitySuccess(responseJson));
	} catch (error) {
		yield put(fetchCityFailure(error));
	}
}

export function* fetchCityStart() {
	yield takeEvery(CityActionTypes.FETCH_CITY_START, fetchCityStartAsync);
}

export function* citySagas() {
	yield all([call(fetchCityStart)]);
}
