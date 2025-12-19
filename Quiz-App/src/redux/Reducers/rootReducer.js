import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import QuizReducer from "./QuizReducer";
import SettingsReducer from "./SettingsReducer";
import NavigationReducer from "./NavigationReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  AuthReducer,
  SettingsReducer,
  QuizReducer,
  NavigationReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
