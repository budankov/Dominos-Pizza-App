import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import {
  persistedCartSlice,
  persistedLanguageSlice,
  persistedLocationSlice,
} from "./persisted/persistConfig";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    location: persistedLocationSlice,
    language: persistedLanguageSlice,
    cart: persistedCartSlice,
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
