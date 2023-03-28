import React from "react";
import styles from "./Login.module.scss";
import loginImg from "../../assets/login.png";
import { FaGoogle } from "react-icons/fa";

const LoginContent = ({ setCurrentScreen }) => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login illustration" width={400} />
      </div>
      <div className={styles.form}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <p>
            Forgot password?{" "}
            <button
              type="button"
              className="--btn"
              style={{ display: "inline", paddingInline: "0" }}
              onClick={() => setCurrentScreen("reset")}
            >
              Click here
            </button>
          </p>
          <button type="submit" className="--btn --btn-primary --btn-block">
            Login
          </button>
        </form>
        <p style={{ marginBlock: "1.5rem" }}>
          Don't have an account?{" "}
          <button
            className="--btn"
            style={{ display: "inline", paddingInline: "0" }}
            onClick={() => setCurrentScreen("register")}
          >
            Register
          </button>
        </p>
        <p style={{ textAlign: "center" }}> -- or -- </p>
        <button
          className="--btn --btn-danger --btn-block"
          style={{ marginTop: "2rem", gap: ".5rem" }}
        >
          <FaGoogle />
          Login with Google
        </button>
      </div>
    </section>
  );
};

export default LoginContent;
