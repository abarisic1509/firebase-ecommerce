import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoggedInOnlyRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.auth.userEmail);

  //console.log(isLoggedIn, userEmail);

  return isLoggedIn && userEmail ? children : <Navigate to="/login" />;
};

export default LoggedInOnlyRoute;
