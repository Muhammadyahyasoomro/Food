import React from "react";
import { Link } from "react-router-dom";
import toggleImg from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const {theme}=useTheme();
  return (
    <div
      style={{
        backgroundColor: theme==="light"?"#F8F9FA":"#292939",
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
        <ul style={{ listStyleType: "none", padding: 0,  }}>
          <li style={{ marginBottom: "1rem", }}>
            <Link to="/BigRides" style={{color:theme==="light"?"black":"red",fontFamily:"cursive",fontSize:"1.1rem"}}>Home</Link>
          </li>
          <li style={{ marginBottom: "1rem", }}>
            <Link to="/MyRides" style={{color:theme==="light"?"black":"red",fontFamily:"cursive",fontSize:"1.1rem"}}>My Rides</Link>
          </li>
          <li style={{ marginBottom: "1rem", }}>
            <Link to="/History" style={{color:theme==="light"?"black":"red",fontFamily:"cursive",fontSize:"1.1rem"}} >History</Link>
          </li>

          <li style={{ marginBottom: "1rem" }}>
            <Link to="/WorkingZonePage" style={{color:theme==="light"?"black":"red",fontFamily:"cursive",fontSize:"1.1rem"}}>Update Working Zone</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
