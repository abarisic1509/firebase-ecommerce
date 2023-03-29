import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { removeActiveUser } from "../../redux/features/authSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h1>
        e<span>Commerce</span>.
      </h1>
    </Link>
  </div>
);

const Header = () => {
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleCartMenu = () => {
    setCartMenuOpen(!cartMenuOpen);
  };
  const showCartMenu = () => {
    setCartMenuOpen(true);
  };
  const hideCartMenu = () => {
    setCartMenuOpen(false);
  };
  const toggleMobiletMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const hideMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout sucessfull");
        navigate("/login");
        dispatch(removeActiveUser());
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  console.log(userName);
  return (
    <header>
      <ToastContainer />
      <div className={styles.header}>
        {logo}
        <nav
          className={mobileMenuOpen ? `${styles["show-nav"]}` : `${"hide-nav"}`}
        >
          <div
            className={
              mobileMenuOpen
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${"nav-wrapper"}`
            }
            onClick={hideMobileMenu}
          ></div>
          <ul onClick={hideMobileMenu}>
            <li style={{ marginInline: "auto" }}>
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? `${styles.active}` : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? `${styles.active}` : ""
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className={styles["header-right"]}>
              <ul>
                <li className="dropdown-wrapper">
                  <button
                    className={`dropdown-btn ${styles["cart-menu_btn"]}`}
                    onMouseEnter={showCartMenu}
                    onMouseLeave={hideCartMenu}
                  >
                    <FaShoppingCart size={32} />

                    <p>0</p>
                  </button>
                  <div
                    className={
                      cartMenuOpen
                        ? `dropdown-menu ${styles["cart-menu_menu"]} dropdown-menu-show`
                        : `dropdown-menu ${styles["cart-menu_menu"]}`
                    }
                  >
                    <ul>
                      <li>
                        <h3>Item title</h3>
                        <p>x2</p>
                        <p>30,00€</p>
                      </li>
                      <li>
                        <h3>A bit longer item title</h3>
                        <p>x2</p>
                        <p>30,00€</p>
                      </li>
                      <li>
                        <h3>
                          Very, very, very long item title with lots of chars
                        </h3>
                        <p>x2</p>
                        <p>30,00€</p>
                      </li>
                    </ul>
                    <Link to="/cart">Go to cart</Link>
                  </div>
                </li>
                {!isLoggedIn ? (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? `${styles.active}` : ""
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                ) : (
                  <li className="dropdown-wrapper">
                    <button
                      className={`dropdown-btn ${styles["profile-menu_btn"]}`}
                      onMouseEnter={showCartMenu}
                      onMouseLeave={hideCartMenu}
                    >
                      <HiOutlineUserCircle size={32} />
                      {userName}
                    </button>
                    <div
                      className={
                        cartMenuOpen
                          ? `dropdown-menu ${styles["profile-menu_menu"]} dropdown-menu-show`
                          : `dropdown-menu ${styles["profile-menu_menu"]}`
                      }
                    >
                      <ul>
                        <li>
                          <Link to={"/orders"}>My orders</Link>
                        </li>
                        <li>
                          <Link to={"/cart"}>My cart</Link>
                        </li>
                        <li>
                          <button onClick={handleLogout}>Logout</button>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </nav>
        <div className={styles["mobile-menu-options"]}>
          <div className={styles["cart-menu"]} onClick={toggleCartMenu}>
            <button className={styles["cart-menu_btn"]}>
              <FaShoppingCart size={32} />

              <p>0</p>
            </button>
            <div
              className={
                cartMenuOpen
                  ? `${styles["cart-menu_menu"]} ${styles["show-cart-menu"]}`
                  : styles["cart-menu_menu"]
              }
            >
              <ul>
                <li>
                  <h3>Item title</h3>
                  <p>x2</p>
                  <p>30,00€</p>
                </li>
                <li>
                  <h3>A bit longer item title</h3>
                  <p>x2</p>
                  <p>30,00€</p>
                </li>
                <li>
                  <h3>Very, very, very long item title with lots of chars</h3>
                  <p>x2</p>
                  <p>30,00€</p>
                </li>
              </ul>
              <Link to="/cart">Go to cart</Link>
            </div>
          </div>
          <button
            className={styles["cart-menu_btn"]}
            onClick={toggleMobiletMenu}
          >
            <HiOutlineMenuAlt3 size={32} color="#fff" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
