import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let isFetching = true;

    if (isFetching) {
      getProduct();
    }

    return () => {
      isFetching = false;
    };
  }, []);

  const getProduct = async () => {
    const docRef = doc(firestore, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProduct({
        id,
        ...docSnap.data(),
      });
    } else {
      // doc.data() will be undefined in this case
      toast.error("No product found");
    }
  };
  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };
  const decreaseCount = () => {
    if (count >= 2) {
      setCount((prev) => prev - 1);
    } else {
      setCount(1);
    }
  };
  console.log(product);
  return (
    <section>
      <ToastContainer />
      <div className={`container ${styles.product}`}>
        <h2>Product details</h2>
        <div>
          <Link to="/">&larr; Back to products</Link>
        </div>
        {product === null ? (
          <Loader />
        ) : (
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className={styles.content}>
              <h3>{product.name}</h3>
              <p className={styles.price}>${product.price}</p>
              <p>{product.description}</p>
              <p>
                <b>SKU</b>
                {product.id}
              </p>
              <p>
                <b>Brand</b>
                {product.brand}
              </p>
              <div className={styles.count}>
                <button className="--btn" onClick={decreaseCount}>
                  -
                </button>
                <p>
                  <b>{count}</b>
                </p>
                <button className="--btn" onClick={increaseCount}>
                  +
                </button>
              </div>
              <button className="--btn --btn-danger">ADD TO CART</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
