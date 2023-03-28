import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./Loader.module.scss";
import loader from "../../assets/loader.gif";

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loader} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
