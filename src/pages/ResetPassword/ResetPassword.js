import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../store/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import LoaderSpinner from "../../components/Loader/Loader";
import { toastifyFailure, toastifySuccess } from "../../utils/toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const passwordValidation = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters long"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const resetSuccess = await authCtx.resetPassword(values, token);
      if (resetSuccess.status === "Failed") {
        setLoading(false);
        toastifyFailure(resetSuccess.message);
      } else {
        setLoading(false);
        toastifySuccess(resetSuccess.message);
        navigate("/dashboard/main");
      }
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Reset New Password</h2>

          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={passwordValidation.handleSubmit}
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
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={passwordValidation.handleChange}
                      onBlur={passwordValidation.handleBlur}
                      value={passwordValidation.values.password}
                    />
                    {passwordValidation.touched.password &&
                    passwordValidation.errors.password ? (
                      <div className="alert alert-danger">
                        {passwordValidation.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      placeholder="Confirm Password"
                      onChange={passwordValidation.handleChange}
                      onBlur={passwordValidation.handleBlur}
                      value={passwordValidation.values.passwordConfirm}
                    />
                    {passwordValidation.touched.passwordConfirm &&
                    passwordValidation.errors.passwordConfirm ? (
                      <div className="alert alert-danger">
                        {passwordValidation.errors.passwordConfirm}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 mb-5 w-100"
                      disabled={!passwordValidation.isValid}
                    >
                      Set New Password
                    </button>
                  </div>
                  <div
                    id="emailHelp"
                    className="form-text text-center mb-5 text-dark"
                  >
                    Remember your login details?{" "}
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

export default ResetPassword;
