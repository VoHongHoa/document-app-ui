import React from "react";
import { LoginContextProvider } from "./LoginContext";
import LoginContent from "./LoginContent";

const LoginPage: React.FC = () => {
  return (
    <LoginContextProvider>
      <LoginContent />
    </LoginContextProvider>
  );
};
export default LoginPage;
