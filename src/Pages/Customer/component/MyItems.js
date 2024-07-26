import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function MyItems({ Quantity, Image, f_name, price, cartid }) {
  const { theme } = useTheme();

  const lightTheme = {
    borderColor:"2px solid red",
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
    borderColor:"2px solid gold",
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
      className="my-items-container mx-5 m-2 rounded"
      style={{ backgroundColor: styles.backgroundColor,border:styles.borderColor }}
    >
      <div
        className="my-items-content rounded d-flex align-items-center"
        style={{ color: styles.color, }}
      >
        <div
          className="Quantity d-flex"
          style={{
            backgroundColor: styles.quantityBackground,
            color: styles.quantityColor,
            
          }}
        >
          <div
            className="positive border text-white ms-3 me-3 mx-1 p-2 rounded fs-3 px-3"
            style={{
              backgroundColor: styles.buttonBackground,
              color: styles.buttonColor,
              userSelect:"none"
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
          <div
            className="fs-5 mt-2"
            style={{ color: styles.quantityColor }}
          >
            {Quantity}
          </div>
          <div
            className="positive text-white ms-3 mx-1 p-2 border rounded fs-3 px-3"
            style={{
              backgroundColor: styles.buttonBackground,
              color: styles.buttonColor,
              userSelect:"none"
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
        </div>
        <div className="Image mx-3 ms-5">
          <img
            src={`http://localhost/WebApplication2/Content/FoodItems/${Image}`}
            style={{
              width: 100,
              height: 50,
            }}
            alt={f_name}
          />
        </div>
        <div
          className="ItemName text-black fs-6 text-capitalize"
          style={{
            backgroundColor: styles.itemBackground,
           
          }}
        >
          <p style={{color:styles.itemColor}}> {f_name}</p>
         
        </div>
        <div
          className="price ms-auto me-5 px-5 p-2 rounded"
          style={{
            backgroundColor: styles.priceBackground,
            color: styles.priceColor,
            
          }}
        >
          Rs: {price}
        </div>
      </div>
    </div>
  );
}
