import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";
import filterReducer from "./features/filterSlice";
import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filters: filterReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
