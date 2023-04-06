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
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCount: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCount: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseCount,
  decreaseCount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
