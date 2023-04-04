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
      let filteredProductsArr = [];
      if (search === "") {
        filteredProductsArr = productsData;
      } else {
        filteredProductsArr = productsData.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        );
      }
      state.filteredProducts = filteredProductsArr;
    },
    filterBySort: (state, action) => {
      const { productsData, sort } = action.payload;
      let sortedProductsArr = [];

      if (sort === "latest") {
        sortedProductsArr = productsData;
      } else if (sort === "low-to-high") {
        sortedProductsArr = productsData
          .slice()
          .sort((a, b) => a.price - b.price);
      } else if (sort === "high-to-low") {
        sortedProductsArr = productsData
          .slice()
          .sort((a, b) => b.price - a.price);
      } else if (sort === "a-z") {
        sortedProductsArr = productsData
          .slice()
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
      } else if (sort === "z-a") {
        sortedProductsArr = productsData
          .slice()
          .sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase())
          );
      }

      state.filteredProducts = sortedProductsArr;
      //   console.log(state.filteredProducts);
    },
    filterByCategory: (state, action) => {
      const { productsData, category } = action.payload;
      let filteredProductsArr = [];

      if (sort === "all") {
        filteredProductsArr = productsData;
      } else {
        filteredProductsArr = productsData.filter(
          (product) => product.category === category
        );
      }

      state.filteredProducts = sortedProductsArr;
      //   console.log(state.filteredProducts);
    },
  },
});

export const { filterBySearch, filterBySort } = filterSlice.actions;

export default filterSlice.reducer;
