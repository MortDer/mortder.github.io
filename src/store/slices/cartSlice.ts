import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'src/utils/product';

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const alreadyInCart = state.items.some((product) => product.id === action.payload.id);

      if (!alreadyInCart) {
        state.items.unshift(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
