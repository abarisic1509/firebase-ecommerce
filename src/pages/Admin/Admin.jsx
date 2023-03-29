import React from "react";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import styles from "./Admin.module.scss";
import Dashboard from "./Dashboard/Dashboard";
import Products from "./Products/Products";
import SideNav from "./SideNav/SideNav";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <SideNav />
      <main className={styles.content}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
