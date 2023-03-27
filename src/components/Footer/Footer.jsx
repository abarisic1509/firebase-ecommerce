import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className={styles.footer}>&copy; {year} All rights reserved</footer>
  );
};

export default Footer;
