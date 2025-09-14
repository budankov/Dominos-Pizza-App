// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  dough: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  totalQty: number;
}

const initialState: CartState = {
  items: [],
  totalQty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<Omit<CartItem, "qty">>) => {
      const existing = state.items.find(
        (i) =>
          i.id === payload.id &&
          i.size === payload.size &&
          i.dough === payload.dough
      );
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...payload, qty: 1 });
      }
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0);
    },
    increaseQty: (
      state,
      { payload }: PayloadAction<{ id: string; size: string; dough: string }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.id === payload.id &&
          i.size === payload.size &&
          i.dough === payload.dough
      );
      if (item) item.qty += 1;
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0);
    },
    decreaseQty: (
      state,
      { payload }: PayloadAction<{ id: string; size: string; dough: string }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.id === payload.id &&
          i.size === payload.size &&
          i.dough === payload.dough
      );
      if (item) {
        if (item.qty > 1) item.qty -= 1;
        else
          state.items = state.items.filter(
            (i) =>
              !(
                i.id === payload.id &&
                i.size === payload.size &&
                i.dough === payload.dough
              )
          );
      }
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0);
    },
    removeFromCart: (
      state,
      { payload }: PayloadAction<{ id: string; size: string; dough: string }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.id === payload.id &&
            i.size === payload.size &&
            i.dough === payload.dough
          )
      );
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQty = 0;
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
