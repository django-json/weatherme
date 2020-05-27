import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import weatherReducer from "./weather/weather.reducer";
import cityReducer from "./city/city.reducer";

/*redux-persist configuration*/
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["city"],
};

const rootReducer = combineReducers({
	weather: weatherReducer,
	city: cityReducer,
});

export default persistReducer(persistConfig, rootReducer);
