import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../store/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import { toastifyFailure, toastifySuccess } from "../../utils/toastify";
import LoaderSpinner from "../../components/Loader/Loader";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userValidation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const logSuccess = await authCtx.loginUser(values);
      if (logSuccess.status === "Failed") {
        setLoading(false);
        toastifyFailure(logSuccess.message);
      } else {
        setLoading(false);
        toastifySuccess(logSuccess.message);
        setTimeout(() => {
          navigate("/dashboard/main");
        }, 3000);
      }
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">
            Login into your account!
          </h2>
          <div className="text-center mb-5 text-dark"></div>
          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={userValidation.handleSubmit}
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
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Your Email Address"
                      onChange={userValidation.handleChange}
                      onBlur={userValidation.handleBlur}
                      value={userValidation.values.email}
                    />
                    {userValidation.touched.email &&
                    userValidation.errors.email ? (
                      <div className="alert alert-danger">
                        {userValidation.errors.email}
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
                      onChange={userValidation.handleChange}
                      onBlur={userValidation.handleBlur}
                      value={userValidation.values.password}
                    />
                    {userValidation.touched.password &&
                    userValidation.errors.password ? (
                      <div className="alert alert-danger">
                        {userValidation.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 mb-5 w-100"
                    >
                      Login
                    </button>
                  </div>
                  <div className="row text-center">
                    <div className="col-md-4 offset-md-1">
                      <div
                        id="emailHelp"
                        className="form-text text-center mb-5 text-dark"
                      >
                        <Link
                          to="/forgotpassword"
                          className="text-dark fw-bold"
                        >
                          {" "}
                          Reset Password
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-4 offset-md-1">
                      <div
                        id="emailHelp"
                        className="form-text  mb-15 text-dark"
                      >
                        Not Registered?{" "}
                        <Link to="/register" className="text-dark fw-bold">
                          {" "}
                          Register
                        </Link>
                      </div>
                    </div>
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

export default Login;
