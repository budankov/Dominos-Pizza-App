import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import languageSlice from "../reducers/languageSlice";
import locationSlice from "../reducers/locationSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userLocation", "userLanguage"],
};

const rootReducer = combineReducers({
  userLocation: locationSlice,
  userLanguage: languageSlice,
});

export const persistedRootReducer = persistReducer(persistConfig, rootReducer);
