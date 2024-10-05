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
import { Arrow90degLeft } from "react-bootstrap-icons";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/"
);

function App() {
  const { theme } = useTheme();
  const [showRecruiterMenu, setShowRecruiterMenu] = useState(false); // Toggle recruiter menu
  const [showVideoPopup, setShowVideoPopup] = useState(true);

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
    backgroundColor: "#ff6347",
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
    maxWidth: "250px",
  };

  const videoPopupStyles = {
    position: "fixed",
    top: "50px",
    left: "10%",
    width: "80%",
    height: "60vh",
    backgroundColor: "rgba(10, 10, 10, 0.8)",
    display: showVideoPopup ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const videoContainerStyles = {
    position: "relative",
    width: "100%",
    padding: "20px",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
  };

  const videoTagStyles = {
    position: "absolute",
    top: "-40px",
    left: "20px",
    backgroundColor: "#ff6347",
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  };

  const iframeStyles = {
    width: "100%",
    height: "100%",
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
          <img
            src={require("./Components/assets/recuiterslogo.png")}
            style={{
              width: "63px",
              height: "63px",
              objectFit: "contain",
              backgroundColor: "transparent",
              borderRadius: "50%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              filter: "brightness(0.9) contrast(1.1)",
            }}
            alt="Recruiter's Logo"
          />
        </div>

        {/* Recruiter Navigation Menu */}
        <div style={menuStyles}>
          <p>
            <strong>Navigate as:</strong>
          </p>
          <ul>
            <li>
              <Link to="/SignupRider">Signup Rider</Link>
            </li>
            <li>
              <Link to="/LoginRider">Login Rider</Link>
            </li>
            <li>
              <Link to="/Myrides">My Rides</Link>
            </li>
            <li>
              <Link to="/History">Ride History</Link>
            </li>
          </ul>
        </div>

        {/* Video Popup */}
        <div style={videoPopupStyles}>
          <div style={videoContainerStyles}>
           
            <iframe
              style={iframeStyles}
               src={require("../src/Components/assets/videodemolocal.mp4")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div
              style={closeButtonStyles}
              onClick={() => setShowVideoPopup(false)}
            >
              <Arrow90degLeft />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
