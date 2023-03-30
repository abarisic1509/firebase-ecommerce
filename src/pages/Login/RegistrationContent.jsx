import React, { useState } from "react";
import styles from "./Login.module.scss";
import regImg from "../../assets/register.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../../redux/features/authSlice";

const RegistrationContent = ({ setCurrentScreen }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(auth.currentUser);

        updateProfile(user, {
          displayName: displayName,
        })
          .then(() => {
            dispatch(
              setActiveUser({
                userEmail: user.email,
                userName: user.displayName,
                userId: user.uid,
              })
            );
            setLoading(false);
            toast.success("Registration successfull");
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <section className={`container ${styles.auth}`}>
      {loading && <Loader />}
      <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="--btn --btn-primary --btn-block"
            style={{ marginBlock: "1rem" }}
          >
            Register
          </button>
          <ToastContainer />
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
