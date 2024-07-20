import React from "react";
import { Link } from "react-router-dom";
import toggleImg from "../../../Components/assets/rider/toggle.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      style={{
        backgroundColor: "#F8F9FA",
        height: "100vh",
        width: isOpen ? "250px" : "0",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1050,
        padding: isOpen ? "1rem" : "0",
        borderRight: isOpen ? "1px solid #ddd" : "none",
        overflowY: "auto",
        transition: "width 0.3s ease, padding 0.3s ease",
      }}
    >
      {isOpen && (
        <div
          style={{
            marginBottom: "2rem",
            marginTop: "1.25rem",
            textAlign: "center",
          }}
        >
          <Link onClick={toggleSidebar}>
            <img src={toggleImg} width={20} alt="Toggle" />
          </Link>
        </div>
      )}
      {isOpen && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/HomeRider">Home</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/MyRides">My Rides</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/History">History</Link>
          </li>

          <li style={{ marginBottom: "1rem" }}>
            <Link to="/WorkingZonePage">Update Working Zone</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
