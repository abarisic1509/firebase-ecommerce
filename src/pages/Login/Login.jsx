import React, { useState } from "react";
import LoginContent from "./LoginContent";
import RegistrationContent from "./RegistrationContent";
import ResetContent from "./ResetContent";

const Login = ({ setIsLoggedIn }) => {
  const [currentScreen, setCurrentScreen] = useState("login");

  return currentScreen === "login" ? (
    <LoginContent
      setCurrentScreen={setCurrentScreen}
      setIsLoggedIn={setIsLoggedIn}
    />
  ) : currentScreen === "register" ? (
    <RegistrationContent
      setCurrentScreen={setCurrentScreen}
      setIsLoggedIn={setIsLoggedIn}
    />
  ) : (
    <ResetContent setCurrentScreen={setCurrentScreen} />
  );
};

export default Login;
