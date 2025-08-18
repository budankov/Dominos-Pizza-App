import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserCityState {
  userCity: string;
}

const initialState: UserCityState = {
  userCity: "kyiv",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.userCity = action.payload;
    },
  },
});

export const { setCity } = locationSlice.actions;
export default locationSlice.reducer;
