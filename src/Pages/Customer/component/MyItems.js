import React from "react";

export default function MyItems({ Quantity, Image, f_name, price, cartid }) {
  return (
    <div className="my-items-container mx-5 m-2">
      <div className="my-items-content bg-white border rounded d-flex align-items-center">
        <div className="Quantity d-flex">
          <div
            className="positive bg-danger text-white ms-3 me-3 mx-1 p-2 rounded fs-3 px-3"
            onClick={() => {
              fetch(
                `http://localhost/fooddeliverysystems/api/customer/DecrementCartQuantity?cartId=${cartid}`,
                { method: "post" }
              )
                .then((response) => {
                  return response.json;
                })
                .then((data) => {
                  Quantity = data;
                });
              window.location.reload();
            }}
          >
            -
          </div>
          <div className="text-black fs-5 mt-2">{Quantity}</div>
          <div
            className="positive bg-danger text-white ms-3 mx-1 p-2 border rounded fs-3 px-3"
            onClick={() => {
              fetch(
                `http://localhost/fooddeliverysystems/api/customer/IncrementCartQuantity?cartId=${cartid}`,
                { method: "post" }
              )
                .then((response) => {
                  return response.json;
                })
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
            src={`http://localhost/fooddeliverysystems/Content/FoodItem/${Image}`}
            style={{
              width: 100,
              height: 50,
            }}
            alt={f_name}
          />
        </div>
        <div className="size weight text-black fs-6  text-capitalize mx-4 px-3 mt-3"></div>
        <div className="ItemName text-black fs-6  text-capitalize">
          {f_name}
        </div>
        <div className="price bg-danger text-white ms-auto me-5 px-5 p-2 rounded ">
          Rs: {price}
        </div>
      </div>
    </div>
  );
}
