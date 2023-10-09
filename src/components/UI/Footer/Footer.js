import React from "react";
import { FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">
          Made with <FaHeart color="red" /> by{" "}
          <a href="">Abubakari Sherifdeen</a>
        </p>

        <a
          href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        ></a>
      </footer>
    </div>
  );
};

export default Footer;
