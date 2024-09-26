import React from "react";
import { Link } from "react-router-dom";
import {
  StarFill,
  House,
  Cart,
  ListCheck,
  Heart,
  BoxArrowRight,
  Calendar,
  Person,
  BoxArrowInRight,
  Envelope,
} from "react-bootstrap-icons"; // Import the icons you need
import toggle from "../../../Components/assets/rider/toggle.png";
import { useTheme } from "../../../context/ThemeContext";
import { useFilter } from "../../../context/FilterContext";

const CustomerSidebar = ({ isOpen, toggleSidebar }) => {
  const { theme } = useTheme();
  const {
    ApplyFilter,
    filterType,
    setFilterType,
    rating,
    setRating,
    setChefRating,
    chefRating,
    min,
    setMin,
    max,
    setMax,
    ResetFilter,
  } = useFilter();

  const renderStars = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => <StarFill key={i} style={{ color: "" }} />);
  };
  const renderChefStars = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => <StarFill key={i} style={{ color: "yellow" }} />);
  };

  const handleHomechef = () => setFilterType(true);
  const handleRestaurant = () => setFilterType(false);

  const handleResetFilters = () => {
    setFilterType(null);
    setRating(null);
    setMin("");
    setMax("");
    ResetFilter();
    toggleSidebar();
  };

  const handleApplyFilters = () => {
    ApplyFilter({ min, max, filterType, rating });
    console.log("Min Value:", min);
    console.log("Max Value:", max);
    console.log("Type Value:", filterType);
    console.log("Rating:", rating);

    toggleSidebar();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("www.quettacafe.com");
    alert("Link copied to clipboard!");
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
            display: flex;
            align-items: center;
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
          .active-filter {
            background-color: red !important;
            color: white !important;
          }
          .icon {
            margin-right: 8px;
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
            <div className="filter-box border-top border-bottom border-3 rounded border-danger py-2">
              <h5 className="text-danger text-center">Filters</h5>
              <div className="filter-item text-danger">
                <label>Price Range</label>
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    style={{ width: "45%", marginRight: "10%" }}
                    value={min}
                    onChange={(event) => setMin(Number(event.target.value))}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    style={{ width: "45%" }}
                    value={max}
                    onChange={(event) => setMax(Number(event.target.value))}
                  />
                </div>
              </div>
              <div className="text-danger" style={{ fontFamily: "cursive" }}>
                <label>Min Rating</label>
                {[5, 4, 3, 2, 1].map((starCount) => (
                  <div
                    key={starCount}
                    className={rating === starCount ? "active-filter" : ""}
                    onClick={() => setRating(starCount)}
                    style={{ cursor: "pointer" }}
                  >
                    {renderStars(starCount)}
                  </div>
                ))}
              </div>
              {/* chef rating filter*/}
              {/* chef rating filter*/}
              <div>
                <div className="fs-5 text-danger">min MasterChef Rated</div>
                <div className="stars">
                  <div className="row">
                    <button
                      className="5star border border-0 "
                      style={{
                        backgroundColor: chefRating === 5 ? "red" : "white",
                      }}
                      onClick={() => {
                        setChefRating(5);
                        console.log("chef rating", chefRating);
                      }}
                    >
                      {renderChefStars(5)}
                    </button>
                  </div>
                  <div className="row">
                    <button
                      className="5star border-0 "
                      style={{
                        backgroundColor: chefRating === 4 ? "red" : "white",
                      }}
                      onClick={() => {
                        setChefRating(4);
                        console.log("chef rating", chefRating);
                      }}
                    >
                      {renderChefStars(4)}
                    </button>
                  </div>
                  <div className="row">
                    <button
                      className="5star border-0 "
                      style={{
                        backgroundColor: chefRating === 3 ? "red" : "white",
                      }}
                      onClick={() => {
                        setChefRating(3);
                        console.log("chef rating", chefRating);
                      }}
                    >
                      {renderChefStars(3)}
                    </button>
                  </div>
                  <div className="row">
                    <button
                      className="5star border-0 "
                      style={{
                        backgroundColor: chefRating === 2 ? "red" : "white",
                      }}
                      onClick={() => {
                        setChefRating(2);
                        console.log("chef rating", chefRating);
                      }}
                    >
                      {renderChefStars(2)}
                    </button>
                  </div>
                  <div className="row">
                    <button
                      style={{
                        backgroundColor: chefRating === 1 ? "red" : "white",
                      }}
                      className="5star border-0 "
                      onClick={() => {
                        setChefRating(1);
                        console.log("chef rating", chefRating);
                      }}
                    >
                      {renderChefStars(1)}
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <button
                  className={`btn btn-outline-danger me-1 ${
                    filterType === true ? "active-filter" : ""
                  }`}
                  onClick={handleHomechef}
                >
                  HomeChef
                </button>
                <button
                  className={`btn btn-outline-danger ${
                    filterType === false ? "active-filter" : ""
                  }`}
                  onClick={handleRestaurant}
                >
                  Restaurant
                </button>
              </div>
              <div>
                <button
                  className="container border-0 bg-grey text-black py-2 my-2"
                  onClick={handleResetFilters}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="container border-0 bg-danger text-white py-2 my-2"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {[
                {
                  to: "/customer/MyOrderHistory",
                  text: "My Order History",
                  icon: <ListCheck className="icon" />,
                },
                {
                  to: "/HomeCustomer",
                  text: "Home",
                  icon: <House className="icon" />,
                },
                {
                  to: "/customer/myOrders",
                  text: "My Orders",
                  icon: <BoxArrowInRight className="icon" />,
                },
                {
                  to: "/Mycart",
                  text: "My Cart",
                  icon: <Cart className="icon" />,
                },
                {
                  to: "/customer/schedule",
                  text: "My Weekly Schedule",
                  icon: <Calendar className="icon" />,
                },
                {
                  to: "/Customer/MyDisease",
                  text: "My Disease",
                  icon: <Person className="icon" />,
                },
                {
                  to: "/Favourites",
                  text: "Favourites",
                  icon: <Heart className="icon" />,
                },
                {
                  text: "Invite Friends",
                  onClick: handleCopyLink,
                  icon: <Envelope className="icon" />,
                }, // Added copy to clipboard functionality
                {
                  to: "/LogOut",
                  text: "Log Out",
                  icon: <BoxArrowRight className="icon" />,
                },
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: "1rem" }}>
                  {item.to ? (
                    <Link to={item.to} className="sidebar-link">
                      {item.icon}
                      {item.text}
                    </Link>
                  ) : (
                    <span
                      className="sidebar-link"
                      onClick={item.onClick}
                      style={{ cursor: "pointer" }}
                    >
                      {item.icon}
                      {item.text}
                    </span>
                  )}
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
