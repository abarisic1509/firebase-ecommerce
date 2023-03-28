import React, { useState } from "react";
import LoginContent from "./LoginContent";
import RegistrationContent from "./RegistrationContent";
import ResetContent from "./ResetContent";

const Login = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  console.log(currentScreen);
  return currentScreen === "login" ? (
    <LoginContent setCurrentScreen={setCurrentScreen} />
  ) : currentScreen === "register" ? (
    <RegistrationContent setCurrentScreen={setCurrentScreen} />
  ) : (
    <ResetContent setCurrentScreen={setCurrentScreen} />
  );
};

export default Login;
