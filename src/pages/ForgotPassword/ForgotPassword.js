import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../store/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import LoaderSpinner from "../../components/Loader/Loader";

import { toastifyFailure, toastifySuccess } from "../../utils/toastify";

const ForgotPassword = () => {
  const authCtx = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const emailValidation = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const forgotSuccess = await authCtx.forgotPassword(values);
      if (forgotSuccess.status === "Failed") {
        setLoading(false);
        toastifyFailure(forgotSuccess.message);
      } else {
        setLoading(false);
        toastifySuccess(forgotSuccess.message);
        resetForm();
      }
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Reset Your Password</h2>

          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={emailValidation.handleSubmit}
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
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={emailValidation.handleChange}
                      onBlur={emailValidation.handleBlur}
                      value={emailValidation.values.email}
                    />
                    {emailValidation.touched.email &&
                    emailValidation.errors.email ? (
                      <div className="alert alert-danger">
                        {emailValidation.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 mb-5 w-80"
                      disabled={!emailValidation.isValid}
                    >
                      Request Password Reset
                    </button>
                  </div>
                  <div
                    id="emailHelp"
                    className="form-text text-center mb-5 text-dark"
                  >
                    Remember Password?{" "}
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

export default ForgotPassword;
