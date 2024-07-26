import React, { useEffect, useState } from "react";
import Checkout from "./Customer/component/Checkout";
import MyItems from "./Customer/component/MyItems";
import Img from "../../src/Components/assets/Logo/HomeRestaurant.png";
import ViewCart from "./Customer/component/ViewCart";
import Navbarcustomer from "./Customer/component/NavbarCustomer";
import OrderTracker from "./Customer/component/OrderTracker";
import { useTheme } from "../context/ThemeContext";
export default function MyCart() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("10:00");
  const c_id = localStorage.getItem("c_id");
  const {theme}=useTheme();

  useEffect(() => {
    localStorage.removeItem("WeeklySchedule");
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
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleTimeChange = (event) => {
    setTime(event.target.value);
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
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          style={{
             padding: "10px",
              fontSize: "16px",
               backgroundColor:theme==="light"?"white":"darkgrey",
               color:theme==="light"?"black":"white",
               borderRadius:"1rem",
               borderColor:theme==="light"?"red":"gold"}}
        />
      </div>
      <div className="myItems" style={{ marginTop: "20px", overflow:"auto",height:"200px",scrollbarColor:"red"}}>
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
