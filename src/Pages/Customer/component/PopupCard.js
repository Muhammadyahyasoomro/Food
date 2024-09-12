import React, { useEffect, useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { Cart4 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function PopupCard({ bid, show, onHide }) {
  const API_BASE_URL = `http://localhost/WebApplication2/api`;
  const Isschedule = localStorage.getItem("isschedule");
  const [popupCard, setPopupCard] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (bid) {
      fetch(`${API_BASE_URL}/Customer/GetFoodItemDetailsById?foodItemId=${bid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setPopupCard(data);

          // Find the first valid image
          const firstItemWithImage = data.find((item) => item.f_image);
          setImage(firstItemWithImage ? firstItemWithImage.f_image : "");

          // Find the first valid description
          const firstItemWithDescription = data.find(
            (item) => item.description
          );
          setDescription(
            firstItemWithDescription ? firstItemWithDescription.description : ""
          );

          // Find the first valid name
          const firstItemWithName = data.find((item) => item.name);
          setName(firstItemWithName ? firstItemWithName.name : "");

          // Find the first valid price
          const firstItemWithPrice = data.find((item) => item.price);
          setPrice(firstItemWithPrice ? firstItemWithPrice.price : "");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [bid]);

  const onAdd = () => setQuantity(quantity + 1);

  const onSub = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOptionChange = (id) => setSelectedOptionId(id);

  const handleAddToSchedule = () => {
    const orderData = {
      selectedOptionId,
      quantity,
      name,
    };

    navigate(`/customer/schedule`, { state: { orderData } });
  };

  const handleAddToCart = () => {
    fetch(
      `${API_BASE_URL}/Customer/AddToCart?fooddetail_id=${selectedOptionId}&customer_id=${localStorage.getItem(
        "c_id"
      )}&quantity=${quantity}`,
      { method: "POST" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("Isschedule", "0"); // Reset Isschedule to 0
        navigate(`/mycart`);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  // Default image URL or placeholder image
  const defaultImageUrl =
    "http://localhost/WebApplication2/Content/FoodItems/default-image.jpg";

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <div style={{ position: "absolute", margin: "1rem" }}>
        <Button
          className="rounded-5 text-white border border-white bg-danger"
          onClick={onHide}
        >
          X
        </Button>
      </div>
      <Modal.Header
        style={{
          backgroundImage: `url(${
            image
              ? `http://localhost/WebApplication2/Content/FoodItems/${image}`
              : defaultImageUrl
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "10rem",
          backgroundColor: !image ? "gray" : "transparent", // Fallback color
        }}
        className="bg-danger"
      >
        <img
          src={`http://localhost/WebApplication2/Content/FoodItems/${image}`}
          alt="Food Item"
          style={{ display: "none" }}
          onError={(e) => {
            e.target.style.display = "none";
            console.error("Image failed to load:", e.target.src);
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <div style={{ backgroundColor: "white", padding: "1rem" }}>
          <Row>
            <Col sm={6} className="text-capitalize fw-bold fs-5">
              {name}
            </Col>
            <Col sm={6} className="fst-italic">
              <p className="fst-italic">Starting From Rs{price}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>{description}</Col>
          </Row>
          <div
            style={{
              border: "2px solid #dc3545",
              borderRadius: "0.5rem",
              padding: "1rem",
              backgroundColor: "#FDEAEA",
              marginTop: "1rem",
            }}
          >
            <Row
              style={{
                color: "black",
                fontSize: "0.9rem",
                fontStyle: "italic",
                marginBottom: "0.5rem",
              }}
            >
              <Col xs={4}>Select One</Col>
              <Col xs={4}>Unit</Col>
              <Col xs={4}>Price</Col>
            </Row>
            {popupCard.map((item) => (
              <Row
                key={item.id}
                style={{
                  color: "black",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  marginBottom: "0.5rem",
                  alignItems: "center",
                }}
              >
                <Col xs={4}>
                  <input
                    type="radio"
                    value={item.id}
                    checked={selectedOptionId === item.id}
                    onChange={() => handleOptionChange(item.id)}
                    style={{ marginRight: "0.5rem" }}
                  />
                </Col>
                <Col xs={4}>{item.unit}</Col>
                <Col xs={4}>{item.price}</Col>
              </Row>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={onSub}>
          -
        </Button>
        <p>{quantity}</p>
        <Button variant="danger" onClick={onAdd}>
          +
        </Button>
      </Modal.Footer>
      <div className="text-center">
        <Button
          className="text-white bg-danger rounded border-0 m-1"
          onClick={() => {
            if (Isschedule === "true") {
              handleAddToSchedule();
            } else {
              handleAddToCart();
            }
          }}
        >
          Add to
          <span className="mx-1 fs-4">🛒</span>
        </Button>
      </div>
    </Modal>
  );
}
