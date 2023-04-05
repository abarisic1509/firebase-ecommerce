import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProductNav.module.scss";
import {
  //filterByBrand,
  //filterByCategory,
  setFilterByBrand,
  setFilterByCategory,
} from "../../../redux/features/filterSlice";

const ProductNav = ({ productsData }) => {
  const dispatch = useDispatch();
  const filterByCategory = useSelector(
    (state) => state.filters.filterByCategory
  );
  const filterByBrand = useSelector((state) => state.filters.filterByBrand);
  //const [category, setCategory] = useState("All");
  //const [brand, setBrand] = useState("All");

  const allCategories = [
    "All",
    ...new Set(productsData.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(productsData.map((product) => product.brand)),
  ];
  console.log(filterByBrand, filterByCategory);
  // useEffect(() => {
  //   dispatch(filterByCategory({ productsData, category }));
  // }, [dispatch, productsData, category]);
  // useEffect(() => {
  //   dispatch(filterByBrand({ productsData, brand }));
  // }, [dispatch, productsData, brand]);

  //console.log(allCategories);

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
      <p>1000</p>
      <div className={styles.price}>
        <input type="range" name="price" id="price" min={100} max={10000} />
      </div>
      <br />
      <button className="--btn --btn-danger">Clear filters</button>
    </div>
  );
};

export default ProductNav;
