import React from "react";

import styles from "./AddProductModal.module.scss";
import { HiOutlineXCircle } from "react-icons/hi";

const AddProductModal = ({ setIsModalActive }) => {
  return (
    <div role="dialog" className={styles.product}>
      <div className={styles.overlay}></div>
      <div className={styles.card}>
        <div className={styles["modal-header"]}>
          <h3>Add new product</h3>
          <button className="--btn" onClick={() => setIsModalActive(false)}>
            <HiOutlineXCircle size={40} color="#333" />
          </button>
        </div>
        <form>
          <fieldset>
            <label htmlFor="productName">Product name</label>
            <input type="text" name="productName" id="productName" />
          </fieldset>
          <fieldset>
            <label htmlFor="productImg">Product image</label>
            <input type="file" name="productImg" id="productImg" />
          </fieldset>
          <fieldset>
            <label htmlFor="productPrice">Product price</label>
            <input type="text" name="productPrice" id="productPrice" />
          </fieldset>
          <fieldset>
            <label htmlFor="productCategory">Product category</label>
            <select name="productCategory" id="productCategory">
              <option value="">-- Choose --</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="productBrand">Product brand</label>
            <input type="text" name="productBrand" id="productBrand" />
          </fieldset>
          <fieldset>
            <label htmlFor="productDesc">Product description</label>
            <textarea
              name="productDesc"
              id="productDesc"
              cols="30"
              rows="10"
            ></textarea>
          </fieldset>
          <button className="--btn --btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
