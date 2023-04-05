import React from "react";

import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";

const ProductCard = ({ grid, product }) => {
  const dispatch = useDispatch();
  const { name, id, description, price, imgUrl } = product;

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortened = text.substring(0, n).concat("...");
      return shortened;
    }
    return text;
  };

  return (
    <div className={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`} className={styles.img}>
        {" "}
        <img src={imgUrl} alt={name} />
      </Link>
      <div className={styles.content}>
        <Link className={styles.details} to={`/product-details/${id}`}>
          <p>${price}</p>
          <h4>{grid ? shortenText(name, 20) : shortenText(name, 40)}</h4>
          {!grid && (
            <p className={styles.description}>
              {shortenText(description, 200)}
            </p>
          )}
        </Link>
        <button
          className="--btn --btn-danger"
          onClick={() => dispatch(addToCart({ ...product, count: 1 }))}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
