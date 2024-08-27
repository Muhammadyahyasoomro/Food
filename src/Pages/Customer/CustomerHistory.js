import React, { useEffect, useState } from "react";
import Navbarcustomer from "../Customer/component/NavbarCustomer";
import PopupCard from "./component/PopupCard";
export default function CustomerHistory() {
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const [foodItemId, setFoodItemId] = useState();

  const handleShowPopup = () => {
    setShowPopup(true);
  };
  useEffect(() => {
    fetch(
      `http://localhost/WebApplication2/api/customer/customerhistory?c_id=${localStorage.getItem(
        "c_id"
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setHistory(data));
  }, []);

  const handleOrderAgain = (orderId) => {
    // Implement the re-order logic here
  };

  return (
    <>
      <Navbarcustomer />
      <div className="container">
        <h3 className="mt-3 fw-bold">Past Orders</h3>
        <div className="HistoryCard">
          {history.length > 0 ? (
            history.map((order, index) => (
              <div key={index} className="card mb-3">
                <div className="d-flex justify-content-between align-items-center p-3 border">
                  <div className="d-flex">
                    <img
                      src={`http://localhost/WebApplication2/content/fooditems/${order.FoodImage}`}
                      className="img-fluid rounded"
                      alt={order.FoodName}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="ms-3">
                      <h5 className="card-title">{order.RestaurantName}</h5>
                      <p className="card-text text-muted">
                        Order #{order.OrderNumber}
                      </p>
                      <p className="card-text">{order.FoodName}</p>
                      <p className="card-text text-muted">
                        {order.Status === "cancelled"
                          ? `Cancelled on ${order.OrderDate}`
                          : `Delivered on ${order.OrderDate}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5 className="fw-bold">Rs. {order.Price}</h5>
                    <button
                      className={`btn ${
                        order.Status === "Cancelled"
                          ? "btn-secondary"
                          : "btn-danger"
                      } mt-2`}
                      onClick={() => {
                        setFoodItemId(order.foodItemId);
                        handleShowPopup();
                      }}
                      disabled={order.Status === "cancelled"}
                    >
                      Select items to reorder
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No past orders found.</p>
          )}
        </div>
        {showPopup && (
          <PopupCard
            bid={foodItemId}
            show={showPopup}
            onHide={handleClosePopup}
          />
        )}
      </div>
    </>
  );
}
