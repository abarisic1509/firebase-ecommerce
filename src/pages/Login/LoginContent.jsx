import React, { useState } from "react";
import styles from "./Login.module.scss";
import loginImg from "../../assets/login.png";
import { FaGoogle } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";

const LoginContent = ({ setCurrentScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
        setLoading(false);
      });
  };

  //sign in woth google
  const loginWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoading(false);
        navigate("/");
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
        <img src={loginImg} alt="Login illustration" width={400} />
      </div>
      <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
        <ToastContainer />
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
          onClick={loginWithGoogle}
        >
          <FaGoogle />
          Login with Google
        </button>
      </div>
    </section>
  );
};

export default LoginContent;
