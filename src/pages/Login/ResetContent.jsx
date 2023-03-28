import React from "react";
import styles from "./Login.module.scss";
import resetImg from "../../assets/forgot.png";

const ResetContent = ({ setCurrentScreen }) => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="Reset password illustration" width={400} />
      </div>
      <div className={styles.form}>
        <h2>Reset Password</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <button
            className="--btn --btn-primary --btn-block"
            style={{ marginBlock: "1rem" }}
          >
            Reset password
          </button>
        </form>
        <p style={{ marginBlock: "1.5rem" }}>
          <button
            className="--btn"
            style={{ display: "inline", paddingInline: "0" }}
            onClick={() => setCurrentScreen("login")}
          >
            Back to Login
          </button>
        </p>
      </div>
    </section>
  );
};

export default ResetContent;
