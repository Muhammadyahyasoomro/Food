import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgsrc from "./assets/Logo/redx.png";
import toggleImg from "./assets/rider/toggle.png";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../Pages/Rider/component/Sidebar";

export const Navbar = ({ isLogin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handlelogout=()=>{
    
    fetch( `http://localhost/webapplication2/api/Rider/updateRiderStatus?rider_id=${localStorage.getItem("riderId")}&rider_status=inactive`, { method: "POST" })
    .then((response)=>{return response.json()})
    .then((data)=>{console.log(data)})

    localStorage.clear();

  }

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <nav
        style={{
          backgroundColor: theme === "light" ? "#f0f8ff" : "#292939",
          color: theme === "light" ? "black" : "red",
          display: "flex",
          alignItems: "center",
        }}
        className="navbar navbar-expand-lg fixed-top"
      >
        <Link style={{ paddingLeft: "1rem" }} onClick={toggleSidebar}>
          <img src={toggleImg} width={20} alt="Toggle" />
        </Link>
        <Link className="navbar-brand" to="/myrides" style={{ paddingLeft: "1rem" }}>
          <img src={imgsrc} width="55" height="55" alt="logo" />
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
          <ul
            className="navbar-nav ms-auto justify-content-end"
            style={{ display: "flex", alignItems: "flex-end" }}
          >
             <li>
              <Button
                onClick={toggleTheme}
                style={{
                  backgroundColor: theme === "light" ? "black" : "white",
                  color: theme === "light" ? "white" : "black",
                  border: "none",
                  borderRadius: "2rem",
                  marginRight: "1rem",
                  marginLeft: "1rem",
                  padding: "10px",
                }}
              >
                {theme === "light" ? "Dark" : "Light"} Mode
              </Button>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/myrides"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontSize: 22,
                  paddingBottom: "0.1rem",
                }}
              >
                <p style={{ marginBottom: 0 }}>My Rides</p>
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/history"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontSize: 22,
                  paddingBottom: "0.1rem",
                }}
              >
                <p style={{ marginBottom: 0 }}>History</p>
              </Link>
            </li>
            <li className="nav-item active">
              <Link onClick={()=>{
                handlelogout();
              }}
                className="nav-link"
                to="/"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontSize: 22,
                  paddingBottom: "0.1rem",
                }}
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
