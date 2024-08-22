import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";
import toggle from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";
import { useFilter } from "../../../context/FilterContext";
import { Button } from "react-bootstrap";

const CustomerSidebar = ({ isOpen, toggleSidebar }) => {
  const { theme } = useTheme();

  const {
    ApplyFilter,
    filterType,
    setFilterType,
    rating,
    setRating,
    min,
    setMin,
    max,
    setMax,
  } = useFilter();

  const renderStars = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => <StarFill key={i} style={{ color: "gold" }} />);
  };
  const handleHomechef = () => {
    setFilterType(1);
  };
  const handleRestaurant = () => {
    setFilterType(0);
  };
  const handleResetFilters = () => {
    setFilterType(null);
    setRating(null);
    setMin("");
    setMax("");
  };
  const handleApplyfilters = () => {
    console.log(min + "minValue");
    console.log(max + "maxValue");
    console.log(filterType + "typeValue");
    console.log(rating + "rating");
    ApplyFilter();
  };

  return (
    <div>
      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: red black;
          }
          .sidebar-link {
            color: ${theme === "light" ? "black" : "red"};
            font-family: cursive;
            text-decoration: none;
          }
          .filter-section {
            padding: 1rem;
            border-bottom: 1px solid #ddd;
            margin-bottom: 1rem;
          }
          .filter-item {
            margin-bottom: 1rem;
          }
          .filter-item label {
            display: block;
            margin-bottom: 0.5rem;
          }
          .filter-item input[type="text"] {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            box-sizing: border-box;
          }
          .filter-item input[type="checkbox"] {
            margin-right: 0.5rem;
          }
        `}
      </style>
      <div
        className="custom-scrollbar"
        style={{
          backgroundColor: theme === "light" ? "white" : "black",
          color: "green",
          height: "100vh",
          width: isOpen ? "250px" : "0",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1050,
          padding: isOpen ? "1rem" : "0",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          transition: "width 0.3s ease",
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
          <>
            <div className="filter-box  border-top border-bottom border-3 rounded border-danger py-2  ">
              <h5 className="text-danger text-center">Filters</h5>
              <div className="filter-item text-danger">
                <label>Price Range</label>
                <div>
                  <input
                    type="text"
                    placeholder="Min"
                    style={{ width: "45%", marginRight: "10%" }}
                    onChange={(event) => {
                      setMin(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    style={{ width: "45%" }}
                    onChange={(event) => {
                      setMax(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                className="text-danger "
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontFamily: "cursive",
                  backgroundColor: theme === "light" ? "white" : "black",
                }}
              >
                <label>Min Rating</label>
                <div
                  style={{ backgroundColor: rating === 5 ? "red" : "" }}
                  onClick={() => {
                    setRating(5);
                  }}
                >
                  {renderStars(5)}
                </div>
                <div
                  style={{ backgroundColor: rating === 4 ? "red" : "" }}
                  onClick={() => {
                    setRating(4);
                  }}
                >
                  {renderStars(4)}
                </div>
                <div
                  style={{ backgroundColor: rating === 3 ? "red" : "" }}
                  onClick={() => {
                    setRating(3);
                  }}
                >
                  {renderStars(3)}
                </div>
                <div
                  style={{ backgroundColor: rating === 2 ? "red" : "" }}
                  onClick={() => {
                    setRating(2);
                  }}
                >
                  {renderStars(2)}
                </div>
                <div
                  style={{ backgroundColor: rating === 1 ? "red" : "" }}
                  onClick={() => {
                    setRating(1);
                  }}
                >
                  {renderStars(1)}
                </div>
              </div>
              <div className=" d-flex  ">
                <button
                  className=" btn btn-outline-danger me-1"
                  onClick={() => {
                    handleHomechef();
                  }}
                  style={{
                    backgroundColor: filterType === 1 ? "red" : "",
                    color: filterType === 1 ? "white" : "red",
                  }}
                >
                  HomeChef
                </button>

                <button
                  className=" btn btn-outline-danger "
                  onClick={() => {
                    handleRestaurant();
                  }}
                  style={{
                    backgroundColor: filterType === 0 ? "red" : "",
                    color: filterType === 0 ? "white" : "red",
                  }}
                >
                  Restaurant
                </button>
              </div>
              <div>
                <button
                  className="container border-0 bg-grey text-black py-2 my-2"
                  onClick={() => {
                    handleResetFilters();
                  }}
                >
                  cancel
                </button>
              </div>
              <div>
                <button
                  className="container border-0 bg-danger text-white py-2 my-2"
                  onClick={() => {
                    handleApplyfilters();
                  }}
                >
                  Apply Filters
                </button>
              </div>
              {/* Add more filters as needed */}
            </div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {[
                { to: "/HomeCustomer", text: "Home" },
                { to: "/customer/myOrders", text: "My Orders" },
                { to: "/Mycart", text: "My Cart" },
                { to: "/customer/schedule", text: "My Weekly Schedule" },
                { to: "/customer/daily", text: "My Daily Schedule" },
                { to: "/Checkout", text: "Checkout" },
                { to: "/Customer/MyDisease", text: "My Disease" },
                { to: "/HelpCenter", text: "Help Center" },
                { to: "/Favourites", text: "Favourites" },
                { to: "/InviteFriends", text: "Invite Friends" },
                { to: "/SavedAddresses", text: "Saved Addresses" },
                { to: "/LogOut", text: "Log Out" },
                { to: "/customer/MyOrderHistory", text: "My Order History" },
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: "1rem" }}>
                  <Link to={item.to} className="sidebar-link">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerSidebar;
