import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Form, Modal, Row, Col } from "react-bootstrap";
import logo from "../../../Components/assets/Logo/redx.png";
import notificationIcon from "../../../Components/assets/Logo/notification.png";
import { Filter, StarFill } from "react-bootstrap-icons";
import CustomerSidebar from "./CustomerSidebar";
import toggle from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";

export default function Navbarcustomer({ filter, onSearch, onApplyFilters }) {
  const [showFilters, setShowFilters] = useState(false);
  const {theme,toggleTheme}=useTheme();
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    rating: 0,
    homemade: false,
    restaurant: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const Navigate = useNavigate();

  const handleFilterChange = (filterName, value) => {
    if (filterName === "homemade" || filterName === "restaurant") {
      // Ensure only one of homemade or restaurant is selected at a time
      setFilters({
        ...filters,
        homemade: filterName === "homemade" ? value : false,
        restaurant: filterName === "restaurant" ? value : false,
      });
    } else {
      setFilters({ ...filters, [filterName]: value });
    }
  };

  const renderRatingPicker = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarFill
          key={i}
          className={`rating-star ${
            i <= filters.rating ? "text-warning" : "text-secondary"
          }`}
          onClick={() => handleFilterChange("rating", i)}
        />
      );
    }
    return <div>{stars}</div>;
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    onSearch(value);
  };

  const handleApplyFilters = () => {
    const res_type = filters.homemade ? "1" : filters.restaurant ? "0" : null;

    const filterParams = {
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      rating: filters.rating,
      res_type: res_type,
    };

    onApplyFilters(filterParams);
    setShowFilters(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <CustomerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar
      style={{ backgroundColor: theme==="light"?"white":"#212529",color:theme==="light"?"black":"white"}}
        collapseOnSelect
        expand="lg"
        className="fixed top-0 left-0 right-0 z-50 shadow-lg"
      >
        <div className="d-flex align-items-center" style={{color:theme==="light"?"black":"white"}}>
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
          >
            <img
              src={logo}
              alt="Company Logo"
              width={60}
              className="h-8 mr-2"
            />
            <span className="text-lg font-semibold" style={{color:theme==="light"?"black":"white",fontFamily:"cursive"}}>Quetta Cafe'</span>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Row className="mx-5" style={{ flexDirection: "row-reverse" }}>
              <Col sm={6}>
                <Form.Control
                style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"black"}}
                  type="text"
                  value={searchValue}
                  onChange={handleSearchInputChange}
                  placeholder="Search..."
                />
              </Col>
              <Col
                sm={6}
                className="d-flex justify-content-end align-items-center"
              >
                <Button
                  variant="outline-danger"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter /> Filter
                </Button>
              </Col>
            </Row>
            <Modal
            style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"black"}}
              show={showFilters}
              onHide={() => setShowFilters(false)}
              centered
            >
              <Modal.Header closeButton  style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"black"}}>
                <Modal.Title>Filters</Modal.Title>
              </Modal.Header>
              <Modal.Body  style={{borderColor:"red",border:"2px solid ",color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"black"}}>
                <Form>
                  <Form.Group controlId="priceMin">
                    <Form.Label>Minimum Price</Form.Label>
                    <Form.Control
                     style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"black"}}
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) =>
                        handleFilterChange("priceMin", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="priceMax">
                    <Form.Label>Maximum Price</Form.Label>
                    <Form.Control
                     style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"black"}}
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) =>
                        handleFilterChange("priceMax", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="ratingPicker" >
                    <Form.Label>Rating</Form.Label>
                    {renderRatingPicker()}
                  </Form.Group>
                  <Row className="filter-buttons ">
                    <Col>
                      <Button
                        variant={filters.homemade ? "danger" : "outline-danger"}
                        onClick={() =>
                          handleFilterChange("homemade", !filters.homemade)
                        }
                      >
                        HomeMade
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant={
                          filters.restaurant ? "danger" : "outline-danger"
                        }
                        onClick={() =>
                          handleFilterChange("restaurant", !filters.restaurant)
                        }
                      >
                        Restaurant
                      </Button>
                    </Col>
                  </Row>
                  <Button variant="primary" onClick={handleApplyFilters}>
                    Apply Filters
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <a className="text-gray-700 hover:text-gray-900 mr-4">
            <img src={notificationIcon} width={20} alt="Notification" />
          </a>
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
