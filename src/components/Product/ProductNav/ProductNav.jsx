import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProductNav.module.scss";
import {
  //filterByBrand,
  //filterByCategory,
  setFilterByBrand,
  setFilterByCategory,
  setPriceRange,
  setSearchTerm,
  setSortBy,
} from "../../../redux/features/filterSlice";

const ProductNav = ({ productsData }) => {
  const dispatch = useDispatch();

  const filterByBrand = useSelector((state) => state.filters.filterByBrand);
  const priceRange = useSelector((state) => state.filters.priceRange);

  const allCategories = [
    "All",
    ...new Set(productsData.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(productsData.map((product) => product.brand)),
  ];

  const clearFilters = () => {
    dispatch(setSearchTerm(""));
    dispatch(setFilterByCategory("All"));
    dispatch(setFilterByBrand("All"));
    dispatch(setPriceRange([0, 10000]));
    dispatch(setSortBy("latest"));
  };

  //console.log(priceRange);
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, i) => (
          <button key={i} onClick={() => dispatch(setFilterByCategory(cat))}>
            {cat}
          </button>
        ))}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          name="brand"
          id="brand"
          value={filterByBrand}
          onChange={(e) => dispatch(setFilterByBrand(e.target.value))}
        >
          {allBrands.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <h4>Price</h4>
      <p>${priceRange[1]}</p>
      <div className={styles.price}>
        <input
          type="range"
          name="price"
          id="price"
          min={0}
          max={10000}
          value={priceRange[1]}
          onChange={(e) => dispatch(setPriceRange([0, Number(e.target.value)]))}
        />
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={clearFilters}>
        Clear filters
      </button>
    </div>
  );
};

export default ProductNav;
