import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../../Components/assets/Logo/redx.png";
import notificationIcon from "../../../Components/assets/Logo/notification.png";
import toggle from "../../../Components/assets/rider/toggle.png";
import RestaurantSidebar from "./RestaurantSidebar";
import { useTheme } from "../../../context/ThemeContext";

export const NavbarHome = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navLinkStyle = {
    color: 'red',
    textDecoration: 'none',
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: '16px'
  };

  const navLinkHoverStyle = {
    color: 'white'
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = navLinkHoverStyle.color;
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = navLinkStyle.color;
  };

  return (
    <>
      <RestaurantSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar collapseOnSelect expand="lg" className="navbar navbar-dark " style={{backgroundColor:theme==="light"?"#EBF3F2":"#212529"}}>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-none"
            className="mr-2"
            onClick={toggleSidebar}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <img src={toggle} width={20} alt="Toggle" />
          </Button>
          <Navbar.Brand href="/HomeRestaurant" className="d-flex align-items-center">
            <img src={logo} alt="Company Logo" width={40} className="h-8 mr-2" />
           
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link
              to="/ManageList"
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Manage Listing
            </Link>
            <Link
              to="/NewListing"
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              New Listing
            </Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <a className="text-gray-700 hover:text-gray-900 mr-4">
            <img src={notificationIcon} width={20} alt="Notification" />
          </a>
          <button onClick={toggleTheme}
           style=
           {{
            backgroundColor:theme ==='light' ? 'black' : 'white',
            color:theme==='light'?'white':'black',
            border:"none",
            borderRadius:"2rem",
            marginRight:"1rem",
            marginLeft:"1rem",
            padding:"10px"
          }}
           >
         {theme === 'light' ? 'dark' : 'light'} Mode
      </button>
          <Button
          
            variant="outline-danger"
            onClick={() => {
              localStorage.clear();
              navigate("/LoginRestaurant");
            }}
          >
            Logout
          </Button>
        </div>
      </Navbar>
    </>
  );
};
