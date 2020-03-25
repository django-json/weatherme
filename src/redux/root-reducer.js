import { combineReducers } from 'redux';

import weatherReducer from './weather/weather.reducer';
import cityReducer from './city/city.reducer';

const rootReducer = combineReducers({
	weather: weatherReducer,
	city: cityReducer
});

export default rootReducer;