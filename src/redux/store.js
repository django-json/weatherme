import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import logger from "redux-logger";

import rootReducer from "./root-reducer";

import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);

/*Persisted store version*/
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
