import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(state.cartItems);
      if (productIndex >= 0 /**Item already exists */) {
        state.cartItems[productIndex].count += 1;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
