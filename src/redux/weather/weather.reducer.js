import { WeatherActionTypes } from "./weather.types";
import { filterDailyReading } from "./weather.utils";

const INITIAL_STATE = {
	isFetching: false,
	dailyReading: null,
	error: "",
};

const weatherReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case WeatherActionTypes.FETCH_DAILY_READING_START:
			return {
				...state,
				isFetching: true,
				error: "",
			};
		case WeatherActionTypes.FETCH_DAILY_READING_SUCCESS:
			return {
				...state,
				dailyReading: filterDailyReading(action.payload),
				isFetching: false,
			};
		case WeatherActionTypes.FETCH_DAILY_READING_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default weatherReducer;
