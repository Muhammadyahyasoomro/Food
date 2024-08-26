import React, { useState } from "react";
import { Card, Badge, Button, Image } from "react-bootstrap";
import {
  House,
  Shop,
  Heart,
  HeartFill,
  HeartPulseFill,
} from "react-bootstrap-icons";
import PopupCard from "./PopupCard";
import { useNavigate } from "react-router-dom";

export const FoodCard = ({
  imageUrl,
  rating,
  title,
  type,
  restaurantname,
  price,
  fooddetail_id,
  isHealthy,
  isFavorite,
  favouriteId,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);
  const [isHovered, setIsHovered] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const API_BASE_URL = `http://localhost/WebApplication2/api`;

  const handleToggleFavorite = async () => {
    if (!isFav) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/customer/AddToFavourite?customerId=${localStorage.getItem(
            "c_id"
          )}&foodItemId=${fooddetail_id}`,
          { method: "POST" }
        );
        if (response.ok) {
          const data = await response.json();
          setIsFav(true);
          window.alert("Added to your favorites");
        } else {
          console.error("Failed to add to favorites");
        }
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    } else {
      try {
        const response = await fetch(
          `${API_BASE_URL}/customer/RemoveToFavourite?favouriteId=${favouriteId}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setIsFav(false);
          window.alert("Removed from your favorites");
          onToggleFavorite();
        } else {
          console.error("Failed to remove from favorites");
        }
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }
  };

  const renderIcon = (type) => {
    return type ? <House /> : <Shop />;
  };

  const renderStars = (rating) => {
    let stars = [];
    if (rating <= 0.9) {
      return "";
    }
    for (let i = 0; i < 5; i++) {
      if (i - 0.5 < rating) {
        stars.push("⭐");
      } else {
        stars.push("☆");
      }
    }
    return stars.join("");
  };

  return (
    <>
      <Card
        className="position-relative"
        style={{
          border: "2px solid red",
          borderRadius: "10px",
          width: "13rem",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          onClick={handleToggleFavorite}
          className="position-absolute top-0 end-0 p-2"
          style={{ cursor: "pointer" }}
        >
          {isFav ? <HeartFill color="red" size={24} /> : <Heart size={24} />}
        </div>

        <div className="position-relative">
          <Card.Img
            className="food-image"
            variant="top"
            src={imageUrl}
            height={"150rem"}
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              opacity: isHovered && isHealthy ? 0.5 : 1, // Adjust opacity on hover
            }}
          />
          <Badge bg="danger" className="container">
            {restaurantname}
          </Badge>
          {isHealthy && isHovered && (
            <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{ zIndex: 1 }}
            >
              <HeartPulseFill color="green" size={40} />
            </div>
          )}
        </div>

        <Card.Body style={{ backgroundColor: "#FAD9D9" }}>
          <Card.Title className="fs-6 text-center text-black">
            {title} {renderIcon(type)}
          </Card.Title>

          <Card.Text
            className="text-center fs-3"
            style={{ letterSpacing: "5px" }}
          >
            <Badge bg="danger">{renderStars(rating)}</Badge>
          </Card.Text>
        </Card.Body>

        <Card.Text
          className="bg-danger text-white p-2 rounded text-center"
          style={{ fontSize: 18 }}
        >
          from Rs: {price}
        </Card.Text>

        <Card.Footer className="bg-danger rounded text-white fs-6 text-center">
          <Button variant="danger" onClick={handleShowPopup}>
            See Details
          </Button>
        </Card.Footer>
      </Card>

      {showPopup && (
        <PopupCard
          bid={fooddetail_id}
          show={showPopup}
          onHide={handleClosePopup}
        />
      )}
    </>
  );
};
