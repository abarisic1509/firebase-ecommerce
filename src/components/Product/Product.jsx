import React, { useState } from "react";
import ProductNav from "./ProductNav/ProductNav";
import ProductList from "./ProductList/ProductList";

import styles from "./Product.module.scss";
import { useSelector } from "react-redux";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const productsData = useSelector((state) => state.product.products);
  const [showProductNav, setShowProductNav] = useState(false);

  return (
    <section id="products">
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showProductNav
              ? `${styles.filter} ${styles.show}`
              : `${styles.filter}`
          }
        >
          <ProductNav productsData={productsData} />
        </aside>
        <div className={styles.content}>
          <ProductList productsData={productsData} />
          <button
            className={styles.icon}
            onClick={() => setShowProductNav((prev) => !prev)}
          >
            <FaCogs color="orangered" size={22} />
            <p>
              <b>{showProductNav ? "Hide filters" : "Show filters"}</b>
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
