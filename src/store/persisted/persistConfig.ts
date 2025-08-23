import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import cartSlice from "../reducers/cartSlice";
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

const cartPersistConfig = {
  key: "cart",
  storage: AsyncStorage,
  whitelist: ["userOrder"],
};

export const persistedLocationSlice = persistReducer(
  locationPersistConfig,
  locationSlice
);
export const persistedLanguageSlice = persistReducer(
  languagePersistConfig,
  languageSlice
);

export const persistedCartSlice = persistReducer(cartPersistConfig, cartSlice);
