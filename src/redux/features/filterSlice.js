import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  searchTerm: "",
  filterByCategory: "All",
  filterByBrand: "All",
  sortBy: "latest",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // filterBySearch: (state, action) => {
    //   const { productsData, search } = action.payload;
    //   let filteredProductsArr = [];
    //   if (state.filteredProducts.length === 0) {
    //     //filteredProductsArr = productsData;
    //     if (search === "") {
    //       filteredProductsArr = productsData;
    //     } else {
    //       filteredProductsArr = productsData.filter(
    //         (product) =>
    //           product.name.toLowerCase().includes(search.toLowerCase()) ||
    //           product.category.toLowerCase().includes(search.toLowerCase())
    //       );
    //     }
    //   } else {
    //     if (search === "") {
    //       filteredProductsArr = state.filteredProducts;
    //     } else {
    //       filteredProductsArr = state.filteredProducts.filter(
    //         (product) =>
    //           product.name.toLowerCase().includes(search.toLowerCase()) ||
    //           product.category.toLowerCase().includes(search.toLowerCase())
    //       );
    //     }
    //   }
    //   state.filteredProducts = filteredProductsArr;
    // },
    // filterBySort: (state, action) => {
    //   const { productsData, sort } = action.payload;
    //   let sortedProductsArr = [];
    //   if (state.filteredProducts.length === 0) {
    //     if (sort === "latest") {
    //       sortedProductsArr = productsData;
    //     } else if (sort === "low-to-high") {
    //       sortedProductsArr = productsData
    //         .slice()
    //         .sort((a, b) => a.price - b.price);
    //     } else if (sort === "high-to-low") {
    //       sortedProductsArr = productsData
    //         .slice()
    //         .sort((a, b) => b.price - a.price);
    //     } else if (sort === "a-z") {
    //       sortedProductsArr = productsData
    //         .slice()
    //         .sort((a, b) =>
    //           a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    //         );
    //     } else if (sort === "z-a") {
    //       sortedProductsArr = productsData
    //         .slice()
    //         .sort((a, b) =>
    //           b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    //         );
    //     }
    //   } else {
    //     if (sort === "latest") {
    //       sortedProductsArr = state.filteredProducts;
    //     } else if (sort === "low-to-high") {
    //       sortedProductsArr = state.filteredProducts
    //         .slice()
    //         .sort((a, b) => a.price - b.price);
    //     } else if (sort === "high-to-low") {
    //       sortedProductsArr = state.filteredProducts
    //         .slice()
    //         .sort((a, b) => b.price - a.price);
    //     } else if (sort === "a-z") {
    //       sortedProductsArr = state.filteredProducts
    //         .slice()
    //         .sort((a, b) =>
    //           a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    //         );
    //     } else if (sort === "z-a") {
    //       sortedProductsArr = state.filteredProducts
    //         .slice()
    //         .sort((a, b) =>
    //           b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    //         );
    //     }
    //   }

    //   state.filteredProducts = sortedProductsArr;
    //   //   console.log(state.filteredProducts);
    // },
    // filterByCategory: (state, action) => {
    //   const { productsData, category } = action.payload;
    //   let filteredProductsArr = [];

    //   if (category === "All") {
    //     filteredProductsArr =
    //       state.filteredProducts.length > 0
    //         ? state.filteredProducts
    //         : productsData;
    //   } else {
    //     filteredProductsArr = state.filteredProducts.filter(
    //       (product) => product.category === category
    //     );
    //   }

    //   state.filteredProducts = filteredProductsArr;
    //   //   console.log(state.filteredProducts);
    // },
    // filterByBrand: (state, action) => {
    //   const { productsData, brand } = action.payload;
    //   let filteredProductsArr = [];

    //   if (brand === "All") {
    //     filteredProductsArr =
    //       state.filteredProducts.length > 0
    //         ? state.filteredProducts
    //         : productsData;
    //   } else {
    //     filteredProductsArr = state.filteredProducts.filter(
    //       (product) => product.brand === brand
    //     );
    //   }

    //   state.filteredProducts = filteredProductsArr;
    //   //   console.log(state.filteredProducts);
    // },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterByCategory: (state, action) => {
      state.filterByCategory = action.payload;
    },
    setFilterByBrand: (state, action) => {
      state.filterByBrand = action.payload;
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
      // filteredProducts = filteredProducts.filter(
      //   (product) =>
      //     product.price >= state.priceRange[0] &&
      //     product.price <= state.priceRange[1]
      // );

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
