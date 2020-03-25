import { WeatherActionTypes } from './weather.types';
import { filterDailyReading } from './weather.utils';

const INTIAL_STATE = {
	isFetching: false,
	dailyReading: null, 
	error: ""
};

const weatherReducer = (state = INTIAL_STATE, action) => {
	switch(action.type) {
		case WeatherActionTypes.FETCH_DAILY_READING_START:
			return {
				...state,
				isFetching: true
			}
		case WeatherActionTypes.FETCH_DAILY_READING_SUCCESS:
			return {
				...state,
				dailyReading: filterDailyReading(action.payload),
				isFetching: false
			}
		case WeatherActionTypes.FETCH_DAILY_READING_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		default:
			return state;
	}
};

export default weatherReducer;