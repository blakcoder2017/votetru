import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import ApiService from "../../services/apiServices";
import axios, { setAuthHeader } from "../../utils/axiosClient";
const defaultAuthState = {
  user: null,
  isLoggedIn: false,
};

const apiService = new ApiService("http://localhost:5000/api/v1/users");
const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const register = async (data) => {
    const res = await apiService.post("/register", data);
    if (res.status === "success") {
      return res;
    } else {
      return res.response.data;
    }
  };

  const loginUser = async (data) => {
    const res = await apiService.post("/login", data);

    if (res.status === "success") {
      const { user, token } = res;
      setAuthHeader(token);
      setCurrentUser(user);
      setIsLoggedIn(true);

      // console.log("Axios: ", axios.defaults.headers);

      localStorage.setItem("token", token);
      return res;
    } else {
      return res.response.data;
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuthHeader(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const forgotPassword = async (data) => {
    const res = await apiService.post("/forgotPassword", data);

    if (res.status === "success") {
      return res;
    } else {
      return res.response.data;
    }
  };

  const resetPassword = async (data, token) => {
    const res = await apiService.patch(`/resetPassword/${token}`, data);
    if (res.status === "success") {
      const { user, token } = res;
      setAuthHeader(token);
      setCurrentUser(user);
      setIsLoggedIn(true);

      // console.log("Axios: ", axios.defaults.headers);

      localStorage.setItem("token", token);
      return res;
    } else {
      return res.response.data;
    }
  };

  const value = {
    user: currentUser,
    registerUser: register,
    loginUser: loginUser,
    logoutUser: logout,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    isLoggedIn: isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
