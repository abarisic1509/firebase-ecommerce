import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./SideNav.module.scss";

const SideNav = () => {
  const userName = useSelector((state) => state.auth.userName);
  return (
    <aside className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
