import React from "react";
import { Link } from "react-router-dom";
import pic from "../../../assets/images/homepic.jpg";
const Banner = () => {
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={pic}
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-6 fw-bold lh-1 mb-3">
            Secure, Cloud-based Elections
          </h1>
          <p className="lead">
            Create an election for your school or organization in seconds. Your
            voters can vote from any location on any device.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              to="/register"
              className="btn btn-primary btn-lg px-4 me-md-2"
            >
              Sign up for an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
