import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../pages/Dashboard/Dashboard";

export const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/contact", component: Contact },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard, private: true },
  { path: "/register", component: Register },
];
