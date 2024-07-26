import React, { useEffect, useState } from "react";
import { ArrowRightCircleFill, ClockHistory } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import { useTheme } from "../../../context/ThemeContext";

const ViewCart = ({ CartList, Time }) => {
  const {theme}=useTheme();
  const [cartdata, setcartdata] = useState();
  const [Checkout, setCheckout] = useState();
  const navigate = useNavigate();
  const [scheduleType, setScheduleType] = useState("Daily");

  useEffect(() => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/GetCartTotal?customerId=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => setcartdata(data));
  }, [CartList]);

  const InsertCheckout = CartList.map((item) => ({
    id: item.id,
    fooddetail_id: item.FoodDetailId,
    quantity: item.Quantity,
    customer_id: parseInt(localStorage.getItem("c_id")),
  }));

  const handleSchedule = () => {
    console.log("Navigating to schedule with CartList:", CartList);
    navigate("/customer/schedule", {
      state: {
        CartList,
      },
    });
  };

  // empty functions
  const handledaily = () => {
    console.log("Navigating to schedule with CartList:", CartList);
    navigate("/customer/daily", {
      state: {
        CartList,
      },
    });
  };
  const handleCheckout = () => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/InsertSimpleOrder?customer_id=${localStorage.getItem(
        "c_id"
      )}&time=${Time}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InsertCheckout),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCheckout(data);
        console.log("checkout data ", data);
        navigate("/Checkout", {
          state: {
            data,
            insertedItems: JSON.stringify(InsertCheckout),
            CartList,
            Time,
          },
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  return cartdata ? (
    <div className="fixed-bottom w-100 ">
      <div className="p-1" style={{ backgroundColor:theme==="light"?"#FA813A":"black" }}>
        <div className="TotalPrice d-flex justify-content-between align-items-center p-1">
          <div className="text-white">
            <p className="fs-6">{cartdata.TotalQuantity} Item</p>
            <p className="fs-5">Rs. {cartdata.TotalPrice}</p>
            <p className="fs-6">plus taxes</p>
          </div>
          <div>
            <Popup
              trigger={<ClockHistory className="fs-1 text-white mx-2 " />}
              modal
              closeOnDocumentClick
            >
              {(close) => (
                <div
                  className="popup-content  text-center"
                  style={{
                    backgroundColor:theme==="light"?"white":"black",
                    
                    border:`2px solid ${theme==="light"?"red":"gold"}`,
                    borderRadius: "50px 50px 50px 50px",
                    
                    padding: "20px",
                    width: "300px",
                    // For some spacing from top
                  }}
                >
                  <label className="fs-5 mb-3" style={{ display: "block",color:theme==="light"?"black":"white" }}>
                    Schedule Type
                  </label>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={scheduleType}
                      onChange={(e) => setScheduleType(e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100px",
                        margin: "0 auto",
                        backgroundColor:theme==="light"?"white":"black",
                        color:theme==="light"?"black":"white"
                      }}
                    >
                      <option value="Daily" >Daily</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-outline-warning mt-3 rounded"
                    onClick={() => {
                      if (scheduleType === "Daily") {
                        handledaily();
                      } else {
                        handleSchedule();
                      }
                      close();
                    }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </Popup>
            <ArrowRightCircleFill
              className="fs-1 text-white mx-2"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Go back Add SomeItems</div>
  );
};

export default ViewCart;
