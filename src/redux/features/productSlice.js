import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storeProduct: (state, action) => {
      state.products = action.payload.allProducts;
    },
  },
});

export const { storeProduct } = productSlice.actions;

export default productSlice.reducer;
