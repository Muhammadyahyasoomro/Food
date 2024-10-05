// App.js

import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { SignupRider } from "./Pages/Rider/SignupRider";
import { LoginRider } from "./Pages/Rider/LoginRider";
import { WorkingAreas } from "./Pages/Rider/WorkingAreas";
import { MyRides } from "./Pages/Rider/MyRides";
import NewListing from "./Pages/Restaurant/NewListing";
import History from "./Pages/Rider/History";
import Signup from "./Pages/Customer/Signup";
import SignupRestaurant from "./Pages/Restaurant/Signup";
import LoginRestaurant from "./Pages/Restaurant/Login";
import HomeRestaurant from "./Pages/Restaurant/HomeRestaurant";
import HomeCustomer from "./Pages/Customer/HomeCustomer";
import LoginCustomer from "./Pages/Customer/LoginCustomer";
import BigByte from "./Pages/BigByte";
import SeeDetails from "./Pages/Restaurant/components/SeeDetails";
import PlansandPricing from "./Pages/Restaurant/PlansandPricing";
import ManageList from "./Pages/Restaurant/ManageList";
import Read from "./Pages/Restaurant/Read";
import Edit from "./Pages/Restaurant/Edit";
import Restaurant from "./Pages/Customer/component/Restaurant";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import MyCart from "./Pages/MyCart";
import Checkout from "./Pages/Customer/Checkout";
import MyOrders from "./Pages/Customer/MyOrders";
import Schedule from "./Pages/Customer/Schedule";
import DailyScheduler from "./Pages/Customer/DailyScheduler";
import WorkingZonePage from "./Pages/Rider/WorkingZonePage";
import MyStatus from "./Pages/Restaurant/MyStatus";
import TrackRider from "./Pages/Restaurant/trackRider";
import Favourites from "./Pages/Customer/Favourites";
import BigRides from "./Pages/Rider/BigRides";
import UpdateDisease from "./Pages/Customer/UpdateDisease";
import CustomerHistory from "./Pages/Customer/CustomerHistory";
import RestaurantActiveStatus from "./Pages/Restaurant/RestaurantActiveStatus";
import MasterChef from "./Pages/MasterChef";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/"
);

function App() {
  const { theme } = useTheme();
  const [showRecruiterMenu, setShowRecruiterMenu] = useState(false); // State to toggle recruiter menu

  const appStyles = {
    backgroundColor: theme === "light" ? "white" : "#292929",
    color: theme === "light" ? "black" : "white",
    minHeight: "100vh",
    transition: "all 0.3s ease",
    position: "relative",
  };

  const floatingButtonStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#ff6347", // Button color
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const menuStyles = {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    display: showRecruiterMenu ? "block" : "none",
    zIndex: 1000,
  };

  return (
    <div style={appStyles}>
      <BrowserRouter>
        <Routes>
          {/* Define all routes */}
          <Route exact path="/WorkingZonePage" Component={WorkingZonePage} />
          <Route exact path="/trackorder" Component={TrackRider} />
          <Route exact path="/MyOrders" Component={MyOrders} />
          <Route exact path="/Customer/MyDisease" Component={UpdateDisease} />
          <Route exact path="/Restaurant/Mystatus" Component={MyStatus} />
          <Route exact path="" Component={BigByte} />
          <Route exact path="/SignupRider" Component={SignupRider} />
          <Route exact path="/LoginRider" Component={LoginRider} />
          <Route exact path="/Rider/WorkingAreas" Component={WorkingAreas} />
          <Route exact path="/Myrides" Component={MyRides} />
          <Route exact path="/BigRides" Component={BigRides} />
          <Route exact path="/History" Component={History} />
          <Route exact path="/SignupCustomer" Component={Signup} />
          <Route exact path="/SignupRestaurant" Component={SignupRestaurant} />
          <Route exact path="/LoginRestaurant" Component={LoginRestaurant} />
          <Route exact path="/LoginCustomer" Component={LoginCustomer} />
          <Route exact path="/HomeRestaurant" Component={HomeRestaurant} />
          <Route exact path="/HomeCustomer" Component={HomeCustomer} />
          <Route exact path="/NewListing" Component={NewListing} />
          <Route exact path="/SeeDetails" Component={SeeDetails} />
          <Route exact path="/Plansandpricing" Component={PlansandPricing} />
          <Route exact path="/ManageList" Component={ManageList} />
          <Route exact path="/ReadOnly" Component={Read} />
          <Route exact path="/Edit" Component={Edit} />
          <Route exact path="/Restaurant" Component={Restaurant} />
          <Route exact path="/Mycart" Component={MyCart} />
          <Route exact path="/Favourites" Component={Favourites} />
          <Route exact path="/Checkout" Component={Checkout} />
          <Route exact path="/customer/myOrders" Component={MyOrders} />
          <Route exact path="/customer/schedule" Component={Schedule} />
          <Route exact path="/customer/daily" Component={DailyScheduler} />
          <Route exact path="/MasterChef" Component={MasterChef} />
          <Route
            exact
            path="/customer/MyOrderHistory"
            Component={CustomerHistory}
          />
          <Route exact path="/MyStatus" Component={RestaurantActiveStatus} />
        </Routes>

        {/* Floating Button */}
        <div
          style={floatingButtonStyles}
          onClick={() => setShowRecruiterMenu(!showRecruiterMenu)}
        >
          +
        </div>

        {/* Recruiter Navigation Menu */}
        <div style={menuStyles}>
          <p>
            <strong>Navigate as:</strong>
          </p>
          <ul>
            <li>
              <Link to="/HomeCustomer">Home (Customer)</Link>
            </li>
            <li>
              <Link to="/HomeRestaurant">Home (Restaurant)</Link>
            </li>
            <li>
              <Link to="/Myrides">My Rides (Rider)</Link>
            </li>
            <li>
              <Link to="/SignupRider">Signup (Rider)</Link>
            </li>
            <li>
              <Link to="/SignupRestaurant">Signup (Restaurant)</Link>
            </li>
            <li>
              <Link to="/SignupCustomer">Signup (Customer)</Link>
            </li>
            <li>
              <Link to="/LoginRider">Login (Rider)</Link>
            </li>
            <li>
              <Link to="/LoginRestaurant">Login (Restaurant)</Link>
            </li>
            <li>
              <Link to="/LoginCustomer">Login (Customer)</Link>
            </li>
            <li>
              <Link to="/NewListing">New Listing (Restaurant)</Link>
            </li>
            <li>
              <Link to="/Mycart">My Cart (Customer)</Link>
            </li>
            <li>
              <Link to="/Plansandpricing">Plans & Pricing (Restaurant)</Link>
            </li>
            <li>
              <Link to="/trackorder">Track Order (Restaurant)</Link>
            </li>
            <li>
              <Link to="/Favourites">Favourites (Customer)</Link>
            </li>
          </ul>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
