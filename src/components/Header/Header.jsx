import React, { useEffect, useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownHovered, setDropdownHovered] = useState("");
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isMouseHovering) {
      // Start the timer to close the dropdown only when the mouse is not hovering
      const timer = setTimeout(() => {
        setDropdownHovered("");
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMouseHovering]);
  const showDropdownMenu = (id) => {
    setIsMouseHovering(true);
    setDropdownHovered(id);
  };
  const hideDropdownMenu = () => {
    setIsMouseHovering(false);
  };
  const toggleMobiletMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const hideMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const handleClickOnLink = () => {
    setIsMouseHovering(false);
    setDropdownHovered("");
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
  //console.log(userName);
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
                {isLoggedIn && userEmail === "tm513093@gmail.com" && (
                  <li>
                    <Link to="/admin/dashboard" className="--btn --btn-primary">
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            </li>
            <li className={styles["header-right"]}>
              <ul>
                <li
                  className="dropdown-wrapper"
                  onMouseEnter={() => showDropdownMenu("cart")}
                  onMouseLeave={hideDropdownMenu}
                >
                  <button
                    className={`dropdown-btn ${styles["cart-menu_btn"]}`}
                    onClick={() => {
                      if (dropdownHovered !== "cart") {
                        setDropdownHovered("cart");
                      } else {
                        setDropdownHovered("");
                      }
                    }}
                  >
                    <FaShoppingCart size={32} />

                    <p>0</p>
                  </button>
                  <div
                    className={
                      dropdownHovered === "cart"
                        ? `dropdown-menu ${styles["cart-menu_menu"]} dropdown-menu-show`
                        : `dropdown-menu ${styles["cart-menu_menu"]}`
                    }
                    onMouseLeave={hideDropdownMenu}
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
                    <Link to="/cart" onClick={handleClickOnLink}>
                      Go to cart
                    </Link>
                  </div>
                </li>
                {!isLoggedIn ? (
                  <li style={{ marginBlock: "auto" }}>
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
                  <li
                    className="dropdown-wrapper"
                    onMouseEnter={() => showDropdownMenu("profile")}
                    onMouseLeave={hideDropdownMenu}
                  >
                    <button
                      className={`dropdown-btn ${styles["profile-menu_btn"]}`}
                      onClick={() => {
                        if (dropdownHovered !== "profile") {
                          setDropdownHovered("profile");
                        } else {
                          setDropdownHovered("");
                        }
                      }}
                    >
                      <HiOutlineUserCircle size={32} />
                      {/* {userName} */}
                    </button>
                    <div
                      className={
                        dropdownHovered === "profile"
                          ? `dropdown-menu ${styles["profile-menu_menu"]} dropdown-menu-show`
                          : `dropdown-menu ${styles["profile-menu_menu"]}`
                      }
                      onMouseLeave={hideDropdownMenu}
                    >
                      <div
                        style={{
                          display: "grid",
                          justifyContent: "end",
                          textAlign: "right",
                          paddingBottom: "1rem",
                          paddingLeft: "1rem",
                          borderBottom: "1px solid #0c0c0c",
                          color: "#333",
                        }}
                      >
                        <h4 style={{ fontSize: "1.25rem" }}>
                          Welcome, {userName}
                        </h4>
                        <p style={{ fontSize: ".875rem", opacity: ".7" }}>
                          {userEmail}
                        </p>
                      </div>
                      <ul onClick={handleClickOnLink}>
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
          <ul>
            <li
              className="dropdown-wrapper"
              onMouseEnter={() => showDropdownMenu("cart")}
              onMouseLeave={hideDropdownMenu}
            >
              <button
                className={`dropdown-btn ${styles["cart-menu_btn"]}`}
                onClick={() => {
                  if (dropdownHovered !== "cart") {
                    setDropdownHovered("cart");
                  } else {
                    setDropdownHovered("");
                  }
                }}
              >
                <FaShoppingCart size={32} />

                <p>0</p>
              </button>
              <div
                className={
                  dropdownHovered === "cart"
                    ? `dropdown-menu ${styles["cart-menu_menu"]} dropdown-menu-show`
                    : `dropdown-menu ${styles["cart-menu_menu"]}`
                }
                onMouseLeave={hideDropdownMenu}
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
                <Link to="/cart" onClick={handleClickOnLink}>
                  Go to cart
                </Link>
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
              <li
                className="dropdown-wrapper"
                onMouseEnter={() => showDropdownMenu("profile")}
                onMouseLeave={hideDropdownMenu}
              >
                <button
                  className={`dropdown-btn ${styles["profile-menu_btn"]}`}
                  onClick={() => {
                    if (dropdownHovered !== "profile") {
                      setDropdownHovered("profile");
                    } else {
                      setDropdownHovered("");
                    }
                  }}
                >
                  <HiOutlineUserCircle size={32} />
                  {userName}
                </button>
                <div
                  className={
                    dropdownHovered === "profile"
                      ? `dropdown-menu ${styles["profile-menu_menu"]} dropdown-menu-show`
                      : `dropdown-menu ${styles["profile-menu_menu"]}`
                  }
                  onMouseLeave={hideDropdownMenu}
                >
                  <ul onClick={handleClickOnLink}>
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
            <li>
              <button className="dropdown-btn" onClick={toggleMobiletMenu}>
                <HiOutlineMenuAlt3 size={32} color="#fff" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
