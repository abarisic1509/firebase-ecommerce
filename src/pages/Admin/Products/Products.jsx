import React, { useState } from "react";
import { AddProductModal } from "../../../components";

import styles from "./Products.module.scss";

const Products = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  return (
    <div className="products">
      <button
        className="--btn --btn-danger"
        onClick={() => setIsModalActive(true)}
      >
        Add new product
      </button>

      {isModalActive && <AddProductModal setIsModalActive={setIsModalActive} />}
    </div>
  );
};

export default Products;
