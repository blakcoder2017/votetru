import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./routes/ProtectedRoute";

import HomeLayout from "./components/HomeLayout/HomeLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import Elections from "./pages/Elections/Elections";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import DashboardHome from "./pages/DashboardHome/DashboardHome";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
      </Route>
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="main" element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="elections" element={<Elections />} />
      </Route>
    </Route>
  )
);
