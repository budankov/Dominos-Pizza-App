import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import languageSlice from "../reducers/languageSlice";
import locationSlice from "../reducers/locationSlice";

const locationPersistConfig = {
  key: "location",
  storage: AsyncStorage,
  whitelist: ["userCity"],
};

const languagePersistConfig = {
  key: "language",
  storage: AsyncStorage,
  whitelist: ["userLanguage"],
};

export const persistedLocationSlice = persistReducer(
  locationPersistConfig,
  locationSlice
);
export const persistedLanguageSlice = persistReducer(
  languagePersistConfig,
  languageSlice
);
