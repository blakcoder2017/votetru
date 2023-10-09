import React, { useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth/AuthContext";

const Sidebar = () => {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.currentUser;
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();

  const logout = () => {
    const userLogout = authCtx.logoutUser();
    navigate("/login");
  };

  return (
    <>
      <header className="header dark-bg">
        <div className="toggle-nav">
          <div
            className="icon-reorder tooltips"
            data-original-title="Toggle Navigation"
            data-placement="bottom"
          ></div>
        </div>
        <a href="dashboard.php" className="logo">
          PMIS-GPS<span className="lite"></span>
        </a>

        <div className="top-nav notification-row">
          <ul className="nav pull-right top-menu">
            <li className="dropdown">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="profile-ava">
                  <img alt="" width="35" height="35" src="" />
                </span>
                <span className="username">Welcome Sherif</span>
                <b className="caret"></b>
              </a>
              <ul className="dropdown-menu extended logout">
                <div className="log-arrow-up"></div>

                <li>
                  <a href="#!">
                    <i className="icon_key_alt"></i> Log Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </header>

      <div id="sidebar" className="nav-collapse ">
        <ul className="sidebar-menu">
          <li className="">
            <a className="" href="dashboard.php">
              <i className="icon_house_alt"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className="sub-menu">
            <a href="registration.php" className="">
              <i className="icon_document_alt"></i>
              <span>New Case</span>
            </a>
          </li>

          <li className="sub-menu">
            <a href="javascript:;" className="">
              <i className="icon_profile"></i>
              <span>Suspects</span>
              <span className="menu-arrow arrow_carrot-right"></span>
            </a>
            <ul className="sub">
              <li>
                <a className="" href="suspects.php">
                  General Suspects List
                </a>
              </li>
              <li>
                <a className="" href="remanded.php">
                  <span>Remanded</span>
                </a>
              </li>
              <li>
                <a className="" href="prosecuted.php">
                  <span>Prosecuted</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="sub-menu">
            <a href="javascript:;" className="">
              <i className="icon_profile"></i>
              <span>Missing/Wanted</span>
              <span className="menu-arrow arrow_carrot-right"></span>
            </a>
            <ul className="sub">
              <li>
                <a className="" href="addmissing.php">
                  Add Missing/Wanted Person
                </a>
              </li>
              <li>
                <a className="" href="missingperson.php">
                  <span>List All</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="sub-menu">
            <a href="javascript:;" className="">
              <i className="icon_documents_alt"></i>
              <span>Report</span>
              <span className="menu-arrow arrow_carrot-right"></span>
            </a>
            <ul className="sub">
              <li>
                <a className="" href="generalsuspectsreport.php">
                  Gen Suspects List
                </a>
              </li>
              <li>
                <a className="" href="genderreport.php">
                  Report By Gender
                </a>
              </li>
              <li>
                <a className="" href="datereport.php">
                  <span>Report By Date</span>
                </a>
              </li>
              <li>
                <a className="" href="remandreport.php">
                  <span>Remand Report</span>
                </a>
              </li>
              <li>
                <a className="" href="prosreport.php">
                  <span>Prosecuted Report</span>
                </a>
              </li>
              <li>
                <a className="" href="missingreport.php">
                  <span>Missing Person Report</span>
                </a>
              </li>
              <li>
                <a className="" href="bailedreport.php">
                  <span>Bailed</span>
                </a>
              </li>
            </ul>
          </li>

          <li className="sub-menu">
            <a href="javascript:;" className="">
              <i className="fa fa-cog"></i>
              <span>Configuration</span>
              <span className="menu-arrow arrow_carrot-right"></span>
            </a>
            <ul className="sub">
              <li>
                <a className="" href="systemlog.php">
                  System Log
                </a>
              </li>
              <li>
                <a className="" href="systemusers.php">
                  User Management
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
