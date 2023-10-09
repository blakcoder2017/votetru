import React, { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import AuthContext from "../../store/auth/AuthContext";
import Header from "../UI/Header/Header";

const HomeLayout = () => {
  const authCtx = useContext(AuthContext);
  const outlet = useOutlet();

  if (authCtx.isLoggedIn) {
    return <Navigate to="/dashboard/main" replace />;
  }
  const pages = [
    { label: "Home", path: "/" },
    { label: "Contact Us", path: "/contact" },
    { label: "Login", path: "/login" },
  ];
  return (
    <div>
      <Header pages={pages} />
      {outlet}
    </div>
  );
};

export default HomeLayout;
