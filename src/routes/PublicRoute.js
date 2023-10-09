import { useAuth } from "../store/auth/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return !currentUser ? children : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
