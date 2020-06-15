import { combineReducers } from "redux";
import { persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createWhitelistFilter } from "redux-persist-transform-filter";

import weatherReducer from "./weather/weather.reducer";
import cityReducer from "./city/city.reducer";

/*redux-persist configuration*/
const persistConfig = {
	key: "root",
	storage,
	transforms: [
		createWhitelistFilter("city", ["cities"]),
		createTransform(
			(state) => state,
			(state) =>
				Object.assign({}, state, {
					city: state.city,
				}),
			{
				whitelist: "city",
			}
		),
	],
};

const rootReducer = combineReducers({
	weather: weatherReducer,
	city: cityReducer,
});

export default persistReducer(persistConfig, rootReducer);
