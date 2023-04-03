import React, { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductList.module.scss";

const ProductList = ({ productsData }) => {
  const [grid, setGrid] = useState(true);
  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={22} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>15</b> products found
          </p>
        </div>
        <div>
          <p>Search</p>
        </div>
        <div className={styles.sort}>
          <label htmlFor="sortOpt">Sort by</label>
          <select name="sortOpt" id="sortOpt">
            <option value="latest">Latest</option>
            <option value="low-to-high">Price: low to high</option>
            <option value="high-to-low">Price: high to low</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {productsData.lenght === 0 ? (
          <p>No products found</p>
        ) : (
          <>
            {productsData.map((product) => (
              <div key={product.id}>
                <ProductCard {...product} grid={grid} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
