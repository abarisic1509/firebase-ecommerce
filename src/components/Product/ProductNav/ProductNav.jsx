import React from "react";

import styles from "./ProductNav.module.scss";

const ProductNav = () => {
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        <button>All</button>
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name="brand" id="brand">
          <option value="all">All</option>
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
