import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import logo from "../../../Components/assets/Logo/redx.png";
import notificationIcon from "../../../Components/assets/Logo/notification.png";
import CustomerSidebar from "./CustomerSidebar";
import toggle from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";
import { useSearch } from "../../../context/SearchContext";
import { useHealth } from "../../../context/HealthContext";
export default function Navbarcustomer() {
  const { isHealthyMode, toggleHealth } = useHealth();
  const { setSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const toggleHealthMode = () => {
    toggleHealth();
  };

  return (
    <>
      <CustomerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar
        style={{
          backgroundColor: theme === "light" ? "white" : "#292929",
          color: theme === "light" ? "black" : "white",
          padding: "10px 20px", // Adds padding for better spacing
        }}
        collapseOnSelect
        expand="lg"
        className="fixed top-0 left-0 right-0 z-50 shadow-lg"
      >
        <div
          className="d-flex align-items-center"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          <Button
            variant="outline-none"
            className="mr-2"
            onClick={toggleSidebar}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <img src={toggle} width={20} alt="Toggle" />
          </Button>
          <Navbar.Brand
            onClick={() => {
              Navigate(`/HomeCustomer`);
            }}
            className="d-flex align-items-center"
          >
            <img src={logo} alt="Company Logo" width={60} className="mr-2" />
            <span
              className="text-lg font-semibold"
              style={{
                color: theme === "light" ? "black" : "white",
                fontFamily: "cursive",
              }}
            >
              Quetta Cafe'
            </span>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Row className="mx-5 w-100">
              <Col lg={8} className="ml-auto">
                <input
                  type="text"
                  style={{
                    width: "20rem", // Ensures the input takes full width
                    color: theme === "light" ? "black" : "black",
                    backgroundColor: theme === "light" ? "white" : "white",
                    border: "1px solid black",
                    borderRadius: "1rem",
                    padding: ".5rem",
                  }}
                  onChange={(x) => {
                    setSearch(x.target.value);
                  }}
                  placeholder="Search Fooditems"
                />
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <Button
            onClick={toggleHealthMode}
            style={{
              backgroundColor: isHealthyMode ? "#28a745" : "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "2rem",
              marginRight: "1rem",
              padding: "10px",
            }}
          >
            {isHealthyMode ? "Healthy Mode" : "Cheat Mode"}
          </Button>
          <a className="text-gray-700 hover:text-gray-900 mr-4">
            <img src={notificationIcon} width={20} alt="Notification" />
          </a>
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
          <Button
            variant="outline-danger"
            onClick={() => {
              localStorage.clear();
              Navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </Navbar>
    </>
  );
}
