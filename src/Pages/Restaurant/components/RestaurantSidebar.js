import React from "react";
import { Link } from "react-router-dom";
import toggle from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";

const RestaurantSidebar = ({ isOpen, toggleSidebar }) => {
  const {theme}=useTheme();
  const linkStyle = {
    color: theme==="light"?"black":"red",
    textDecoration: 'none'
  };

  return (
    <div
      style={{
        backgroundColor: theme==="light"?"#EBF3F2":"#212529",
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
            <img src={toggle} width={20} alt="Toggle" />
          </Link>
        </div>
      )}
      {isOpen && (
        <ul  style={{ listStyleType: "none", padding: 0 ,fontFamily:"cursive" }}>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/HomeRestaurant" style={linkStyle}>Home</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/NewListing" style={linkStyle}>New Listing</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/ManageList" style={linkStyle}>Manage List</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/PlansandPricing" style={linkStyle}>Plans and Pricing</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/MyStatus" style={linkStyle}>My Status</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/trackorder" style={linkStyle}>Track Order</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/SeeDetails" style={linkStyle}>See Details</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default RestaurantSidebar;
