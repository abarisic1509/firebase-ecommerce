import React from "react";
import ProductNav from "./ProductNav/ProductNav";
import ProductList from "./ProductList/ProductList";

import styles from "./Product.module.scss";

const Product = () => {
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductNav />
        </aside>
        <div className={styles.content}>
          <ProductList />
        </div>
      </div>
    </section>
  );
};

export default Product;
