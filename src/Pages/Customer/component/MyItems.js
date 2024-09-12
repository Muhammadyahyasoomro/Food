import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Row, Col } from "react-bootstrap";

export default function MyItems({ Quantity, Image, f_name, price, cartid }) {
  const { theme } = useTheme();

  const lightTheme = {
    borderColor: "2px solid red",
    backgroundColor: "#FFFFFF",
    color: "black",
    buttonBackground: "#FF0000",
    buttonColor: "white",
    quantityBackground: "white",
    quantityColor: "black",
    itemBackground: "white",
    itemColor: "black",
    priceBackground: "white",
    priceColor: "black",
  };

  const darkTheme = {
    borderColor: "2px solid gold",
    backgroundColor: "darkred",
    color: "white",
    buttonBackground: "black",
    buttonColor: "white",
    quantityBackground: "darkred",
    quantityColor: "white",
    itemBackground: "darkred",
    itemColor: "white",
    priceBackground: "darkred",
    priceColor: "white",
  };

  const styles = theme === "light" ? lightTheme : darkTheme;

  return (
    <div
      className="my-items-container mx-2 my-2 rounded"
      style={{
        backgroundColor: styles.backgroundColor,
        border: styles.borderColor,
      }}
    >
      <Row
        className="my-items-content rounded d-flex align-items-center p-2"
        style={{ color: styles.color }}
      >
        {/* Quantity Controls */}
        <Col
          xs={3}
          sm={2}
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: styles.quantityBackground,
            color: styles.quantityColor,
          }}
        >
          <div
            className="positive border text-white me-1 p-2 rounded fs-5"
            style={{
              backgroundColor: styles.buttonBackground,
              color: styles.buttonColor,
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              fetch(
                `http://localhost/WebApplication2/api/customer/DecrementQuantity?cartId=${cartid}`,
                { method: "post" }
              )
                .then((response) => response.json())
                .then((data) => {
                  Quantity = data;
                });
              window.location.reload();
            }}
          >
            -
          </div>
          <div className="fs-6 mx-1" style={{ color: styles.quantityColor }}>
            {Quantity}
          </div>
          <div
            className="positive text-white ms-1 p-2 border rounded fs-5"
            style={{
              backgroundColor: styles.buttonBackground,
              color: styles.buttonColor,
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              fetch(
                `http://localhost/WebApplication2/api/customer/IncrementQuantity?cartId=${cartid}`,
                { method: "post" }
              )
                .then((response) => response.json())
                .then((data) => {
                  Quantity = data;
                });
              window.location.reload();
            }}
          >
            +
          </div>
        </Col>

        {/* Item Image */}
        <Col xs={3} sm={2} className="d-flex justify-content-center">
          <img
            src={`http://localhost/WebApplication2/Content/FoodItems/${Image}`}
            style={{
              width: 80,
              height: 50,
              objectFit: "cover",
              borderRadius: "5px",
            }}
            alt={f_name}
          />
        </Col>

        {/* Item Name */}
        <Col
          xs={6}
          sm={4}
          className="d-flex align-items-center"
          style={{ backgroundColor: styles.itemBackground }}
        >
          <p
            className="m-0 text-capitalize fs-6"
            style={{ color: styles.itemColor }}
          >
            {f_name}
          </p>
        </Col>

        {/* Item Price */}
        <Col
          xs={12}
          sm={4}
          className="d-flex justify-content-center justify-content-sm-end align-items-center mt-2 mt-sm-0"
        >
          <div
            className="price p-2 rounded text-center"
            style={{
              backgroundColor: styles.priceBackground,
              color: styles.priceColor,
              minWidth: "70px",
            }}
          >
            Rs: {price}
          </div>
        </Col>
      </Row>
    </div>
  );
}
