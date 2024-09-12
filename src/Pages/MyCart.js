import React, { useEffect, useState } from "react";
import Checkout from "./Customer/component/Checkout";
import MyItems from "./Customer/component/MyItems";
import Img from "../../src/Components/assets/Logo/HomeRestaurant.png";
import ViewCart from "./Customer/component/ViewCart";
import Navbarcustomer from "./Customer/component/NavbarCustomer";
import OrderTracker from "./Customer/component/OrderTracker";
import { useTheme } from "../context/ThemeContext";
import { Col, Row } from "react-bootstrap";

export default function MyCart() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const c_id = localStorage.getItem("c_id");
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.removeItem("WeeklySchedule");

    // Set initial time to one hour later than the current time
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const initialTime = now.toTimeString().slice(0, 5);
    setTime(initialTime);

    fetch(
      `http://localhost/WebApplication2/api/customer/GetCartedItems?id=${c_id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [c_id]);

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;

    // Get the current time and time an hour from now
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    const currentTime = `${String(nowHour).padStart(2, "0")}:${String(
      nowMinute
    ).padStart(2, "0")}`;

    // Add an hour to the current time
    now.setHours(nowHour + 1);
    const minAllowedTime = now.toTimeString().slice(0, 5);

    // Allow selection of time if:
    // 1. It's at least one hour from now.
    // 2. It's between 00:00 and 04:00 AM.
    if (
      selectedTime >= minAllowedTime ||
      (selectedTime >= "00:00" && selectedTime <= "04:00")
    ) {
      setTime(selectedTime);
    } else {
      alert(
        "Please select a time that is at least one hour from now, or between 00:00 and 04:00 AM."
      );
      setTime(minAllowedTime); // Reset to the minimum allowed time
    }
  };

  return (
    <>
      <Navbarcustomer />
      <OrderTracker />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Row
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#f9f9f9",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: theme === "dark" ? "#FFD700" : "#FF4500",
            }}
          >
            Please select a time between one hour from now on until 11:59PM.
          </p>
          <Col
            xs={4}
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              color: theme === "dark" ? "white" : "black",
            }}
          >
            <label htmlFor="timeInput">Select Time</label>
          </Col>
          <Col>
            <input
              id="timeInput"
              type="time"
              value={time}
              onChange={handleTimeChange}
              style={{
                padding: "12px",
                fontSize: "16px",
                backgroundColor: theme === "dark" ? "#444" : "white",
                color: theme === "dark" ? "white" : "black",
                borderRadius: "8px",
                borderColor: theme === "dark" ? "#FFD700" : "#FF4500",
                width: "100%",
              }}
              min={time} // Set the minimum time to the current one-hour-ahead time
            />
          </Col>
        </Row>
      </div>

      <div
        className="myItems"
        style={{
          marginTop: "20px",
          // overflow: "auto",
          height: "200px",
          scrollbarColor: "red",
        }}
      >
        {data.map((item, index) => (
          <MyItems
            key={index}
            Quantity={item.Quantity}
            Image={item.Image}
            f_name={item.Name}
            price={item.Price}
            cartid={item.id}
          />
        ))}
      </div>
      <ViewCart
        CartList={data}
        Time={time}
        // last thing added newly in project
      />
    </>
  );
}
