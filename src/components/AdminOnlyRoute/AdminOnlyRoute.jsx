import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector((state) => state.auth.userEmail);

  if (userEmail === "tm513093@gmail.com") {
    return children;
  }
  return (
    <main
      style={{
        height: "calc(100vh - 160px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <h1>Permission denied</h1>
      <p>This page can only be viewed by an Admin user.</p>

      <Link to="/" className="--btn --btn-primary">
        Back to home
      </Link>
    </main>
  );
};

export default AdminOnlyRoute;
