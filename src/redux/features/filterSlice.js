import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  searchTerm: "",
  filterByCategory: "All",
  filterByBrand: "All",
  priceRange: [0, 100000],
  sortBy: "latest",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterByCategory: (state, action) => {
      state.filterByCategory = action.payload;
    },
    setFilterByBrand: (state, action) => {
      state.filterByBrand = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    filterProducts: (state, action) => {
      const { productsData } = action.payload;
      let filteredProducts = productsData;

      // Filter by search term
      if (state.searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            product.category
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase())
        );
      }

      // Filter by category
      if (state.filterByCategory !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === state.filterByCategory
        );
      }

      // Filter by brand
      if (state.filterByBrand !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand === state.filterByBrand
        );
      }

      // Filter by price range
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= state.priceRange[1]
      );

      // Sort the products
      if (state.sortBy === "low-to-high") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === "high-to-low") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      } else if (state.sortBy === "a-z") {
        filteredProducts = filteredProducts.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      } else if (state.sortBy === "z-a") {
        filteredProducts = filteredProducts.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      }

      return {
        ...state,
        filteredProducts,
      };
    },
  },
});

export const {
  //filterBySearch, filterBySort, filterByCategory, filterByBrand
  setSearchTerm,
  setFilterByCategory,
  setFilterByBrand,
  setSortBy,
  setPriceRange,
  filterProducts,
} = filterSlice.actions;

export default filterSlice.reducer;
