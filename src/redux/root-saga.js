import { all, call } from "redux-saga/effects";

import { weatherSagas } from "./weather/weather.sagas";
import { citySagas } from "./city/city.sagas";

export default function* rootSaga() {
	yield all([call(weatherSagas), call(citySagas)]);
}
