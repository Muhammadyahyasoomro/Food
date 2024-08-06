import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarHome } from "./NavbarHome";
import Table from "react-bootstrap/Table";
import axios from "axios";
export default function SeeDetails() {
  let IpAddress = "localhost";
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  const fetchOrderDetails = () => {
    axios
      .get(
        `http://localhost/WebApplication2/api/Restaurant/getorderdetail?orderId=${orderid}`
      )
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };
  const location = useLocation();
  const Navigate = useNavigate();
  const { orderid } = location.state;

  const [orderDetails, setOrderDetails] = useState([]);
  return (
    <div>
      <NavbarHome />
      <div>
        <h2 className="text-center bg-warning">Order Details</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Ingredients</th>
              <th>Old Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.FoodName}</td>
                <td>{item.Quantity}</td>

                <td>{item.Unit}</td>
                <td>{item.Ingredients}</td>
                <td>{item.Price}</td>
                <td>
                  <img
                    src={`http://${IpAddress}/WebApplication2/Content/FoodItems/${item.Image}`}
                    alt={item.f_image}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ marginLeft: "50rem" }}>
        <button
          className="bg-danger text-white border-0 rounded p-2"
          onClick={() => {
            fetch(
              `http://localhost/WebApplication2/api/Restaurant/OrderIsReady?orderId=${orderid}`,
              {
                method: "POST", // Assuming OrderIsReady endpoint accepts POST method
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) => {
                if (response.ok) {
                  alert("Order status updated successfully.");
                  Navigate("/trackorder");

                  // Optionally, you can perform additional actions upon success
                } else {
                  alert("Failed to update order status.");
                  // Handle error cases if necessary
                }
              })
              .catch((error) => {
                console.error("Error updating order status:", error);
                alert("Failed to update order status.");
                // Handle any network or fetch related errors
              });
          }}
        >
          Order is Ready
        </button>
      </div>
    </div>
  );
}
