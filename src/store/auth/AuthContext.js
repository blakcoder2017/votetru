import React from "react";

const AuthContext = React.createContext({
  user: null,
  registerUser: (user) => {},
  loginUser: (user) => {},
  logoutUser: (user) => {},
  forgotPassword: (user) => {},
  resetPassword: (user) => {},
  isLoggedIn: false,
});

export default AuthContext;
