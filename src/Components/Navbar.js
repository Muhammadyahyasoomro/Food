import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgsrc from "./assets/Logo/red.png";
import toggleImg from "./assets/rider/toggle.png";
import RiderImg from "./assets/rider/Rider.svg";
import Sidebar from "../Pages/Rider/component/Sidebar";

export const Navbar = ({ isLogin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        {/* Added fixed-top class */}
        <Link style={{ paddingLeft: "1rem" }} onClick={toggleSidebar}>
          <img src={toggleImg} width={20} alt="Toggle" />
        </Link>
        <Link className="navbar-brand" to="/" style={{ paddingLeft: "1rem" }}>
          <img src={imgsrc} width="35" height="35" alt="logo" />{" "}
          {/* Added alt attribute */}
        </Link>
        <button
          className="navbar-toggler ms-auto"
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
          <ul className="navbar-nav ms-auto justify-content-end">
            <li>
              <Link
                className="nav-link"
                to="/myrides"
                style={{ color: "red", fontSize: 22 }}
              >
                <p>My Rides</p>
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/history"
                style={{ color: "red", fontSize: 22 }}
              >
                <p>History</p>
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/"
                style={{ color: "red", fontSize: 22 }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
