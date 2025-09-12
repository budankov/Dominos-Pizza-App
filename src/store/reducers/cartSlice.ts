import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem extends Record<string, any> {
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Record<string, any>>) => {
      const payload = action.payload;

      const existing = state.items.find(
        (i) =>
          i.id === payload.id &&
          (payload.size ? i.size === payload.size : true) &&
          (payload.dough ? i.dough === payload.dough : true)
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...payload, qty: 1 });
      }
    },
    incrementQty: (
      state,
      action: PayloadAction<{ id: string; size?: string; dough?: string }>
    ) => {
      const existing = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          (action.payload.size ? i.size === action.payload.size : true) &&
          (action.payload.dough ? i.dough === action.payload.dough : true)
      );
      if (existing) existing.qty += 1;
    },
    decrementQty: (
      state,
      action: PayloadAction<{ id: string; size?: string; dough?: string }>
    ) => {
      const existing = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          (action.payload.size ? i.size === action.payload.size : true) &&
          (action.payload.dough ? i.dough === action.payload.dough : true)
      );
      if (existing) {
        if (existing.qty > 1) {
          existing.qty -= 1;
        } else {
          state.items = state.items.filter(
            (i) =>
              !(
                i.id === action.payload.id &&
                (action.payload.size ? i.size === action.payload.size : true) &&
                (action.payload.dough ? i.dough === action.payload.dough : true)
              )
          );
        }
      }
    },
  },
});

export const { addToCart, incrementQty, decrementQty } = cartSlice.actions;

export default cartSlice.reducer;
