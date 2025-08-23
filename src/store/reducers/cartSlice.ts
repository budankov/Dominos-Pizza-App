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
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    incrementQty: (state, action: PayloadAction<{ id: string }>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.qty += 1;
    },
    decrementQty: (state, action: PayloadAction<{ id: string }>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        if (existing.qty > 1) {
          existing.qty -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
    },
  },
});

export const { addToCart, incrementQty, decrementQty } = cartSlice.actions;

export default cartSlice.reducer;
