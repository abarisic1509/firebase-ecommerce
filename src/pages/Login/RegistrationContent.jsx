import React from "react";
import styles from "./Login.module.scss";
import regImg from "../../assets/register.png";

const RegistrationContent = ({ setCurrentScreen }) => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.form}>
        <h2>Register</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button
            className="--btn --btn-primary --btn-block"
            style={{ marginBlock: "1rem" }}
          >
            Register
          </button>
        </form>
        <p style={{ marginBlock: "1.5rem" }}>
          Already hav an account?{" "}
          <button
            className="--btn"
            style={{ display: "inline", paddingInline: "0" }}
            onClick={() => setCurrentScreen("login")}
          >
            Login
          </button>
        </p>
      </div>
      <div className={styles.img}>
        <img src={regImg} alt="Registration illustration" width={400} />
      </div>
    </section>
  );
};

export default RegistrationContent;
