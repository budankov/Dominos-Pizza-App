import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../localization/i18n";

interface UserLanguageState {
  userLanguage: string;
}

const initialState: UserLanguageState = {
  userLanguage: i18n.language,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.userLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
