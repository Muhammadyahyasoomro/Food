import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import "./style.css";
import "../index.css";

import { Link, useNavigate } from "react-router-dom";
import { GlobalNavbar } from "./GlobalNavbar";

const BigByte = () => {
  const [changingNameIndex, setChangingNameIndex] = useState(0);
  const changingNames = [
    "Quetta's tea Lovers",
    "Quetta's tea enthusiasts",
    "Quetta tea aficionados",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChangingNameIndex(
        (prevIndex) => (prevIndex + 1) % changingNames.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      <GlobalNavbar />
      <div className="background-text my-5">
        <h1
          className="display-1 text-center text-danger  "
          style={{ marginTop: "5rem" }}
        >
          We're {changingNames[changingNameIndex]}
        </h1>
      </div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center mb-5 mb-md-0 border-danger border-start border-4 border-end d-flex align-items-center  ">
              <img
                className="img-fluid "
                src={require("../Components/assets/Logo/homeCustomer.png")}
                alt=""
              />
            </div>
            <div className="col-md-6 align-self-center text-center text-md-left">
              <div className="block">
                <h1 className="font-weight-bold mb-4 font-size-60">
                  Why Join Us?
                </h1>
                <p className="mb-4 h4 ">
                  Our platform allows customers to schedule their food orders
                  according to their preferences. Say goodbye to meal planning
                  and grocery shopping stress. We offer a diverse range of
                  homemade food options from talented home cooks. Our home cooks
                  are passionate about creating high-quality, flavorful meals
                  using fresh ingredients. Customize your meal preferences to
                  suit your dietary needs and preferences. Joining our platform
                  means becoming part of a vibrant community of food lovers and
                  home cooks. Enjoy homemade meals at affordable prices. By
                  choosing homemade food, you're making a conscious choice to
                  support local businesses and reduce food waste.
                </p>

                <Link to="/SignupCustomer" className="btn btn-main">
                  Join us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-orange section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center mb-5 mb-lg-0">
              <img
                className="img-fluid"
                src={require("../Components/assets/Logo/homeRider.png")}
                alt=""
              />
            </div>
            <div className="col-md-6 align-self-center text-center text-md-left">
              <div className="content">
                <h2 className="subheading text-white font-weight-bold mb-10">
                  Join Bigbytes as a Rider
                </h2>
                <p
                  style={{
                    fontFamily: "century",
                    fontSize: "18px",
                    fontWeight: "400",
                    letterSpacing: "0.4",
                  }}
                >
                  Are you looking for flexibility in your work schedule? Do you
                  want to save money, time, and petrol while earning? Bigbytes
                  offers you the opportunity to be your own boss and choose your
                  own working zones. Take control of your earnings and enjoy the
                  freedom to work when and where you want.
                </p>
                <p className="h6">Join us today and become a Bigbytes rider!</p>
                <Link
                  to="/SignupRider"
                  className="btn btn-danger rounded p-3 my-3"
                >
                  Become a Rider
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-list section">
        <div className="container">
          <div className="row mb-40">
            <div className="col-md-6 order-md-1 order-2 align-self-center text-center text-md-left">
              <div className="content">
                <h4 className="fs-1">Join Big Chef Today!.</h4>
                <p
                  style={{
                    fontFamily: "century",
                    fontSize: "18px",
                    fontWeight: "400",
                    letterSpacing: "0.4",
                  
                  }}
                >
                  Are you a restaurant owner or a home chef looking to expand
                  your culinary business?
                </p>
                <p className="" style={{ font: "message-box" }}>
                  Big Chef welcomes both restaurant owners and home chefs to
                  register and showcase their delicious creations to a wide
                  audience.
                </p>
                <p className=" " style={{ font: "message-box" }}>
                  For home chefs, this is your chance to turn your passion for
                  cooking into a lucrative business. Sell your homemade dishes
                  and earn from the comfort of your own kitchen. Manage your
                  time effectively while showcasing your culinary talent to the
                  world.
                </p>
                <p className="" style={{ font: "message-box" }}>
                  Restaurant owners, join us to reach new customers and increase
                  your online presence. Expand your business by tapping into our
                  platform's vast network of food enthusiasts.
                </p>
                <p className="" style={{ font: "message-box" }}>
                  Don't miss out on this opportunity to grow your culinary
                  venture with Big Chef!
                </p>
              </div>
            </div>
            <div className="col-md-6 order-md-2 order-1 text-center mb-5 mb-lg-0">
              <img
                className="img-fluid"
                src={require("../Components/assets/Logo/HomeRestaurant.png")}
                alt=""
              />
              <a href="/Signuprestaurant" className="btn btn-main">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BigByte;
