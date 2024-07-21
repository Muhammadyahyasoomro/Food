import React from "react";
import { Link } from "react-router-dom";
import toggle from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";
const CustomerSidebar = ({ isOpen, toggleSidebar }) => {
  const {theme}=useTheme();
  return (
    
    <div
      style={{
        backgroundColor: theme==="light"?"white":"black",
        height: "100vh",
        width: isOpen ? "250px" : "0", // Adjust width based on isOpen state
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1050,
        padding: isOpen ? "1rem" : "0", // Adjust padding based on isOpen state
        borderRight: "1px solid #ddd",
        overflowY: "auto",
        transition: "width 0.3s ease", // Smooth transition for width
      }}
    >
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
      {isOpen && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/HomeCustomer">Home</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/customer/myOrders">My Orders</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/Mycart">My Cart</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/customer/schedule">My Weekly Schedule</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/customer/daily">My Daily Schedule</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/Checkout">Checkout</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/Customer/MyDisease">My Disease</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/HelpCenter">Help Center</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/Favourites">Favourites</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/InviteFriends">Invite Friends</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/SavedAddresses">Saved Addresses</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/LogOut">Log Out</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/Customer/MyDisease">My Disease</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomerSidebar;
