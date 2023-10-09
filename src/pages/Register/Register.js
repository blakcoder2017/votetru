import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../store/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import { toastifyFailure, toastifySuccess } from "../../utils/toastify";
import LoaderSpinner from "../../components/Loader/Loader";

const Register = () => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerValidation = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const regSuccess = await authCtx.registerUser(values);
      if (regSuccess.status === "Failed") {
        setLoading(false);
        toastifyFailure(regSuccess.message);
      } else {
        setLoading(false);
        toastifySuccess(regSuccess.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Register a new account</h2>

          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={registerValidation.handleSubmit}
            >
              <div className="text-center">
                <div className="toast-container">
                  <ToastContainer limit={2} />
                </div>
              </div>
              {loading ? (
                <div className="text-center">
                  <LoaderSpinner />;
                </div>
              ) : (
                <div>
                  {" "}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      onChange={registerValidation.handleChange}
                      onBlur={registerValidation.handleBlur}
                      value={registerValidation.values.firstName}
                    />
                    {registerValidation.touched.first_name &&
                    registerValidation.errors.first_name ? (
                      <div className="alert alert-danger">
                        {registerValidation.errors.first_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      onChange={registerValidation.handleChange}
                      onBlur={registerValidation.handleBlur}
                      value={registerValidation.values.lastName}
                    />
                    {registerValidation.touched.last_name &&
                    registerValidation.errors.last_name ? (
                      <div className="alert alert-danger">
                        {registerValidation.errors.last_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={registerValidation.handleChange}
                      onBlur={registerValidation.handleBlur}
                      value={registerValidation.values.phone}
                    />
                    {registerValidation.touched.phone &&
                    registerValidation.errors.phone ? (
                      <div className="alert alert-danger">
                        {registerValidation.errors.phone}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={registerValidation.handleChange}
                      onBlur={registerValidation.handleBlur}
                      value={registerValidation.values.email}
                    />
                    {registerValidation.touched.email &&
                    registerValidation.errors.email ? (
                      <div className="alert alert-danger">
                        {registerValidation.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={registerValidation.handleChange}
                      onBlur={registerValidation.handleBlur}
                      value={registerValidation.values.password}
                    />
                    {registerValidation.touched.password &&
                    registerValidation.errors.password ? (
                      <div className="alert alert-danger">
                        {registerValidation.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={registerValidation.handleChange}
                      onBlur={registerValidation.handleBlur}
                      value={registerValidation.values.confirmPassword}
                    />
                    {registerValidation.touched.confirmPassword &&
                    registerValidation.errors.confirmPassword ? (
                      <div className="alert alert-danger">
                        {registerValidation.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 mb-5 w-100"
                      disabled={!registerValidation.isValid}
                    >
                      Register
                    </button>
                  </div>
                  <div
                    id="emailHelp"
                    className="form-text text-center mb-5 text-dark"
                  >
                    Have an account?{" "}
                    <Link to="/login" className="text-dark fw-bold">
                      {" "}
                      Log In
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
