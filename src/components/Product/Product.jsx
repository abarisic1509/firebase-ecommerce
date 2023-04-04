import React from "react";
import ProductNav from "./ProductNav/ProductNav";
import ProductList from "./ProductList/ProductList";

import styles from "./Product.module.scss";
import { useSelector } from "react-redux";

const Product = () => {
  const productsData = useSelector((state) => state.product.products);

  return (
    <section id="products">
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductNav productsData={productsData} />
        </aside>
        <div className={styles.content}>
          <ProductList productsData={productsData} />
        </div>
      </div>
    </section>
  );
};

export default Product;
