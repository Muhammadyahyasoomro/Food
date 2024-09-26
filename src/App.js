// App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  const { theme, toggleTheme } = useTheme();

  const appStyles = {
    backgroundColor: theme === "light" ? "white" : "#292929",
    color: theme === "light" ? "black" : "white",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  return (
    <div style={appStyles}>
      <BrowserRouter>
        <Routes>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
