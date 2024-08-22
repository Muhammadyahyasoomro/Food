import React from "react";
import { Link } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";
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
    min,
    setMin,
    max,
    setMax,
  } = useFilter();

  const renderStars = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => <StarFill key={i} style={{ color: "pink" }} />);
  };

  const handleHomechef = () => setFilterType(true);
  const handleRestaurant = () => setFilterType(false);

  const handleResetFilters = () => {
    setFilterType(null);
    setRating(null);
    setMin("");
    setMax("");
  };

  const handleApplyFilters = () => {
    ApplyFilter({ min, max, filterType, rating });
    console.log("Min Value:", min);
    console.log("Max Value:", max);
    console.log("Type Value:", filterType);
    console.log("Rating:", rating);
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
          .active-filter {
            background-color: red !important;
            color: white !important;
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
            <div className="filter-box  border-top border-bottom border-3 rounded border-danger py-2">
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
