import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterBySearch: (state, action) => {
      const { productsData, search } = action.payload;
      const filteredProductsArr = productsData.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = filteredProductsArr;
      //   console.log(state.filteredProducts);
    },
  },
});

export const { filterBySearch } = filterSlice.actions;

export default filterSlice.reducer;
