import React, { useEffect, useState } from "react";
import Navbarcustomer from "../Customer/component/NavbarCustomer";
import PopupCard from "./component/PopupCard";
import { StarFill, Star } from "react-bootstrap-icons"; // Import filled and empty stars
import { Modal, ModalBody, ModalHeader, Button, Col } from "react-bootstrap"; // Ensure all necessary components are imported

export default function CustomerHistory() {
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [foodItemId, setFoodItemId] = useState();
  const [rating, setRating] = useState();
  const [ModelRate, SetModelRate] = useState(false); // State to manage modal visibility
  const [hover, setHover] = useState(0);
  const [id, setid] = useState();

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

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleRateOrder = (id, rating) => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/RateOrder?id=${id}&rating=${rating}`,
      { method: "POST" }
    )
      .then((response) => {
        if (response.status === 200) {
          alert("Order rated successfully!");

          SetModelRate(false); // Close the modal after successful rating
          window.location.reload();
        } else if (response.status === 400) {
          return response.text().then((message) => {
            alert(message);
          });
        } else if (response.status === 500) {
          return response.text().then((message) => {
            alert("Internal server error: " + message);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      });
  };

  const handleRateRider = (id, rating) => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/RateRider?id=${id}&rating=${rating}`,
      { method: "POST" }
    )
      .then((response) => {
        if (response.status === 200) {
          alert("Order rated successfully!");

          SetModelRate(false); // Close the modal after successful rating
          window.location.reload();
        } else if (response.status === 400) {
          return response.text().then((message) => {
            alert(message);
          });
        } else if (response.status === 500) {
          return response.text().then((message) => {
            alert("Internal server error: " + message);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div>
        {[...Array(totalStars)].map((_, i) =>
          i < rating ? (
            <StarFill key={i} className="text-warning" />
          ) : (
            <Star key={i} className="text-muted" />
          )
        )}
      </div>
    );
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
                          ? `${order.Status} on ${order.OrderDate}`
                          : `${order.Status} on ${order.OrderDate}`}
                      </p>
                      {!order.Rating && order.Status === "delivered" ? (
                        <button
                          className="btn btn-outline-danger rounded-3 "
                          onClick={() => {
                            setid(order.OrderDetailId);
                            SetModelRate(true); // Show the rating modal
                          }}
                        >
                          Rate FoodItem
                        </button>
                      ) : (
                        <>
                          <div className="d-flex mx-2">
                            <Col>Order Rating</Col>{" "}
                            <Col>{renderStars(order.Rating)}</Col>
                          </div>
                        </>
                      )}
                      {!order.RiderRating && order.Status === "delivered" ? (
                        <button
                          className="btn btn-outline-warning rounded-3 "
                          onClick={() => {
                            setid(order.OrderNumber);
                            SetModelRate(true); // Show the rating modal
                          }}
                        >
                          Rate Rider
                        </button>
                      ) : (
                        <>
                          <div className="d-flex mx-2">
                            <Col>Rider Rating</Col>{" "}
                            <Col>{renderStars(order.RiderRating)}</Col>
                          </div>
                        </>
                      )}
                      {/* Display the rating */}
                    </div>
                  </div>
                  <div className="text-end">
                    <h5 className="fw-bold">Rs. {order.Price}</h5>
                    <button
                      className={`btn ${
                        order.Status === "cancelled"
                          ? "btn-secondary"
                          : "btn-danger"
                      } mt-2`}
                      onClick={() => {
                        setFoodItemId(order.foodItemId);
                        handleShowPopup();
                      }}
                      disabled={order.Status != "delivered"}
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
        {/* Rating Modal */}
        <Modal show={ModelRate} onHide={() => SetModelRate(false)}>
          <ModalHeader closeButton>How would you rate this Item?</ModalHeader>
          <ModalBody>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                onMouseOver={() => setHover(num)}
                onMouseLeave={() => setHover(rating)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: num <= (hover || rating) ? "gold" : "gray",
                }}
              >
                &#9733;
              </button>
            ))}
            <Button
              variant="primary"
              onClick={() => handleRateOrder(id, rating)}
              className="mt-3"
            >
              Submit Rating
            </Button>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}
