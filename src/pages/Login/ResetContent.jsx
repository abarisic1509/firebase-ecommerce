import React, { useState } from "react";
import styles from "./Login.module.scss";
import resetImg from "../../assets/forgot.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Loader } from "../../components";

const ResetContent = ({ setCurrentScreen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(`Reset link sent to ${email}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <section className={`container ${styles.auth}`}>
      {loading && <Loader />}
      <div className={styles.img}>
        <img src={resetImg} alt="Reset password illustration" width={400} />
      </div>
      <div className={styles.form}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="--btn --btn-primary --btn-block"
            style={{ marginBlock: "1rem" }}
          >
            Reset password
          </button>
        </form>
        <ToastContainer />
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
