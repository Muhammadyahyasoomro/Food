import React from "react";
import { Container, Button, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export const GlobalNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinkStyle = {
    color: theme === 'light' ? 'black' : 'white',
    textDecoration: 'none'
  };

  return (
    <Navbar className="navbar-dark " style={{backgroundColor:theme === 'light' ? '#EBF3F2' : '#09222A'}} fixed="top">
      <Container>
       
        <Navbar.Brand href="/" className="justify-content-center align-items-center">
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
            backgroundColor: theme === 'light' ? 'black' : 'white',
            color: theme === 'light' ? 'white' : 'black',
            border: "none",
            borderRadius: "2rem",
            marginRight: "1rem",
            marginLeft: "1rem",
            padding: "10px"
          }}
        >
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
          <NavDropdown title="Login" style={{ color: theme === 'light' ? 'black' : 'red'}} id="navbarScrollingDropdown">
            <NavDropdown.Item style={{ backgroundColor: theme === 'light' ? 'white' : 'black'}}>
              <Link to="/loginrider" style={{ color: theme === 'light' ? 'black' : 'red',
                
              }}>
                Rider
              </Link>
            </NavDropdown.Item>
          
            <NavDropdown.Item style={{ backgroundColor: theme === 'light' ? 'white' : 'black'}} >
              <Link to="/loginrestaurant" style={{ color: theme === 'light' ? 'black' : 'red',}}>
                Restaurant
              </Link>
            </NavDropdown.Item>
            
            <NavDropdown.Item style={{ backgroundColor: theme === 'light' ? 'white' : 'black'}} >
              <Link to="/loginCustomer" style={{ color: theme === 'light' ? 'black' : 'red',}}>
                Customer
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
