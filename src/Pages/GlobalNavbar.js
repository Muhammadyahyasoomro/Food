import React from "react";
import { Container, Button, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export const GlobalNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinkStyle = {
    color: theme === "light" ? "black" : "white",
    textDecoration: "none",
  };
  const dropdownStyle = {
    color: theme === "light" ? "black" : "red",

    borderColor: theme === "light" ? "white" : "black",
  };

  const dropdownMenuStyle = {
    minWidth: "10rem",
    padding: "0.5rem 0",
    backgroundColor: theme === "light" ? "white" : "black",
  };
  const itemStyle = {
    backgroundColor: theme === "light" ? "white" : "black",
    borderColor: theme === "light" ? "white" : "black",

    padding: 0, // remove padding
  };
  const linkStyle = {
    display: "block",

    color: theme === "light" ? "black" : "red",
    padding: "8px 16px", // add padding to link instead
    textDecoration: "none", // ensure no underline
  };

  return (
    <Navbar
      style={{ backgroundColor: theme === "light" ? "#EBF3F2" : "#222629" }}
      fixed="top"
    >
      <Container style={{ content: "none" }}>
        <Navbar.Brand href="/" className="">
          <img
            alt="Company Logo"
            src={require("../Components/assets/Logo/redx.png")}
            width="70"
            height="70"
            className="d-inline-block align-bottom"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          <Button
            onClick={toggleTheme}
            style={{
              backgroundColor: theme === "light" ? "black" : "white",
              color: theme === "light" ? "white" : "black",
              border: "none",
              borderRadius: "2rem",
              marginRight: "0.1rem",
              marginLeft: "0.1rem",
              padding: "10px",
            }}
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </Button>
          <>
            <style>
              {`
          .dropdown-menu {
            min-width: ${dropdownMenuStyle.minWidth} !important;
            padding: ${dropdownMenuStyle.padding} !important;
            background-color: ${dropdownMenuStyle.backgroundColor} !important;
          }
        `}
            </style>
            <NavDropdown title="Login" style={dropdownStyle}>
              <NavDropdown.Item style={itemStyle}>
                <Link to="/loginrider" style={linkStyle}>
                  Rider
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={itemStyle}>
                <Link to="/loginrestaurant" style={linkStyle}>
                  Restaurant
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={itemStyle}>
                <Link to="/loginCustomer" style={linkStyle}>
                  Customer
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={itemStyle}>
                <Link to="/masterChef" style={linkStyle}>
                  Master Chef'
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
