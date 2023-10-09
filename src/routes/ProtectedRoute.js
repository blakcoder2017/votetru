import { useContext } from "react";
import { Route, Navigate, useLocation, useOutlet } from "react-router-dom";
import AuthContext from "../store/auth/AuthContext";
import Header from "../components/UI/Header/Header";
// const ProtectedRoute = ({ children }) => {
const ProtectedRoute = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const outlet = useOutlet();

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  const pages = [
    { label: "Elections", path: "elections" },
    { label: "Dashboard", path: "main" },
  ];

  // return children;
  return (
    <div>
      <Header pages={pages} />
      {outlet}
    </div>
  );
};

export default ProtectedRoute;
