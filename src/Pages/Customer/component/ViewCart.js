import React, { useEffect, useState } from "react";
import { ArrowRightCircleFill, ClockHistory } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"; // Ensure this is imported

const ViewCart = ({ CartList, Time }) => {
  const [cartdata, setcartdata] = useState();
  const [Checkout, setCheckout] = useState();
  const navigate = useNavigate();
  const [scheduleType, setScheduleType] = useState("Daily");

  useEffect(() => {
    fetch(
      `http://localhost/FoodDeliverySystems/api/Customer/GetCartTotal?customerId=${localStorage.getItem(
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
      `http://localhost/FoodDeliverySystems/api/Customer/InsertSimpleOrder?customer_id=${localStorage.getItem(
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
    <div className="fixed-bottom w-100">
      <div className="p-1" style={{ backgroundColor: "#FA813A" }}>
        <div className="TotalPrice d-flex justify-content-between align-items-center p-1">
          <div className="text-white">
            <p className="fs-6">{cartdata.TotalQuantity} Item</p>
            <p className="fs-5">Rs. {cartdata.TotalPrice}</p>
            <p className="fs-6">plus taxes</p>
          </div>
          <div>
            <Popup
              trigger={<ClockHistory className="fs-1 text-white mx-2" />}
              modal
              closeOnDocumentClick
            >
              {(close) => (
                <div
                  className="popup-content bg-white text-center"
                  style={{
                    borderRadius: "20px 20px 0 0",
                    borderTop: "3px solid red",
                    padding: "20px",
                    width: "300px",
                    marginTop: "5px", // For some spacing from top
                  }}
                >
                  <label className="fs-5 mb-3" style={{ display: "block" }}>
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
                      }}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-danger mt-3"
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
    <div>hello view cart is empty</div>
  );
};

export default ViewCart;
