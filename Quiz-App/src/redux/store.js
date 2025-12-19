import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./Reducers/rootReducer";
const initalState = {};

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);
