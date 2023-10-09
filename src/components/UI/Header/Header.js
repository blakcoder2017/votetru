import React, { useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth/AuthContext";

const Header = (pages) => {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.currentUser;
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();

  const newPages = pages.pages;

  const logout = () => {
    const userLogout = authCtx.logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div className="container px-5">
        <Link to="/" className="navbar-brand">
          <span className="fw-bolder text-primary">Vote True</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
            {newPages?.map((page) => (
              <li className="nav-item" key={page.label}>
                <Link to={page.path} className="nav-link">
                  {page.label}
                </Link>
              </li>
            ))}
            {!!isLoggedIn && (
              <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaCircleUser />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#!">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Organisation
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
