import React from "react";

import styles from "./ProductCard.module.scss";

const ProductCard = ({
  name,
  category,
  brand,
  description,
  price,
  imgUrl,
  grid,
}) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortened = text.substring(0, n).concat("...");
      return shortened;
    }
    return text;
  };

  return (
    <div className={grid ? `${styles.grid}` : `${styles.list}`}>
      <div className={styles.img}>
        {" "}
        <img src={imgUrl} alt={name} />
      </div>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>${price}</p>
          <h4>{grid ? shortenText(name, 20) : shortenText(name, 40)}</h4>
          {!grid && (
            <p className={styles.description}>
              {shortenText(description, 200)}
            </p>
          )}
        </div>
        <button className="--btn --btn-danger">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
