import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
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
        toast.info(`${action.payload.name} quantity updated`);
      } else {
        state.cartItems = [...state.cartItems, action.payload];
        toast.success(`${action.payload.name} added to cart`);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
