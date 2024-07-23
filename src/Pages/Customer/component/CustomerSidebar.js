import React from "react";
import { Link } from "react-router-dom";
import toggle from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";

const CustomerSidebar = ({ isOpen, toggleSidebar }) => {
  const { theme } = useTheme();

  return (
    <div>
      <style>
        {`
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: red black;
}
        `}
      </style>
      <div
        className="custom-scrollbar"
        style={{
          backgroundColor: theme === "light" ? "white" : "black",
          color: "green",
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
              <Link
                to="/HomeCustomer"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                Home
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/customer/myOrders"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                My Orders
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/Mycart"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                My Cart
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/customer/schedule"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                My Weekly Schedule
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/customer/daily"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                My Daily Schedule
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/Checkout"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                Checkout
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/Customer/MyDisease"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                My Disease
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/HelpCenter"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                Help Center
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/Favourites"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                Favourites
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/InviteFriends"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                Invite Friends
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/SavedAddresses"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                Saved Addresses
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/LogOut"
                style={{
                  color: theme === "light" ? "black" : "red",
                  fontFamily: "cursive",
                }}
              >
                Log Out
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerSidebar;
