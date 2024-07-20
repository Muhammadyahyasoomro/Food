import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar";
import { Enablebtn } from "./component/Enablebtn";
import Sidebar from "./component/Sidebar";
import Earnings from "./component/Earnings";

export const MyRides = () => {
  const [todaysData, setTodaysData] = useState({
    Rides: "",
    Earning: "",
    Rating: "",
  });

  const [MonthlyData, setMonthlyData] = useState({
    Rides: 21,
    Earning: 1000,
    Rating: 4.5,
    TimeLeft: 2.2,
  });

  const [LifeTimeData, setLifeTimeData] = useState({
    Rides: 12,
    Earning: 14000,
    Rating: 3.8,
  });

  useEffect(() => {
    const fetchTodaysEarnings = async () => {
      try {
        const response = await fetch(
          `http://localhost/FoodDeliverySystems/api/Rider/GetTodaysEarnings?riderId=${localStorage.getItem(
            "riderId"
          )}`
        );
        if (response.ok) {
          const data = await response.json();
          setTodaysData({
            Rides: data.Rides,
            Earning: data.Todays_Earning,
            Rating: data.Rating,
          });
        } else {
          console.error("Failed to fetch earnings");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchMonthlyEarnings = async () => {
      try {
        const response = await fetch(
          `http://localhost/FoodDeliverySystems/api/Rider/GetMonthlyEarnings?riderId=${localStorage.getItem(
            "riderId"
          )}`
        );
        if (response.ok) {
          const data = await response.json();
          setMonthlyData({
            Rides: data.Rides,
            Earning: data.Monthly_Earning,
            Rating: data.Rating,
            TimeLeft: data.Days_Left,
          });
        } else {
          console.error("Failed to fetch earnings");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchLifeTimeEarnings = async () => {
      try {
        const response = await fetch(
          `http://localhost/FoodDeliverySystems/api/Rider/GetLifetimeEarnings?riderId=${localStorage.getItem(
            "riderId"
          )}`
        );
        if (response.ok) {
          const data = await response.json();
          setLifeTimeData({
            Rides: data.Rides,
            Earning: data.Lifetime_Earning,
            Rating: data.Rating,
          });
        } else {
          console.error("Failed to fetch earnings");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTodaysEarnings();
    fetchMonthlyEarnings();
    fetchLifeTimeEarnings();
  }, []);

  const toggle = global.toggle; // Access the global toggle variable
  const riderId = localStorage.getItem("riderId");

  return (
    <>
      <Navbar toggle={0} />
      {toggle === 1 && <Sidebar />} {/* Conditionally render Sidebar */}
      <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        My Rides
      </h1>
      <Enablebtn riderId={riderId} />
      <Earnings heading="Today" data={todaysData} />
      <Earnings heading="Monthly" data={MonthlyData} />
      <Earnings heading="LifeTime" data={LifeTimeData} />
    </>
  );
};
