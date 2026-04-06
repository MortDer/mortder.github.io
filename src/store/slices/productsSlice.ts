import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, createRandomProduct } from 'src/utils/product';

type ProductsState = {
  items: Product[];
};

const initialState: ProductsState = {
  items: Array.from({ length: 6 }, () => createRandomProduct(new Date().toISOString())),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.items = state.items.map((product) => (product.id === action.payload.id ? action.payload : product));
    },
  },
});

export const { addProduct, updateProduct } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
