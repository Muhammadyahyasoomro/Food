import React, { useState } from "react";
import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbarcustomer from "./component/NavbarCustomer";
import { useTheme } from "../../context/ThemeContext";

export default function Checkout() {
  const {theme}=useTheme();
  const [address, setAddress] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { data, CartList, Time } = location.state || {};

  // Calculate subtotal and total quantity
  const subtotal = data.reduce((acc, item) => acc + item.total_price, 0);
  const totalQuantity = data.reduce(
    (acc, item) => acc + item.total_quantity,
    0
  );
  const totalShippingFee = data.reduce(
    (acc, item) => acc + 60,
    0
  ); // Calculate total shipping fee
const handleAddress=()=>{
 fetch(`http://localhost/WebApplication2/api/Customer/HandleAddress?address=${address}&customer_id=${localStorage.getItem("c_id")}`,{
  method:"POST",
  
 })
}
  const placeOrder = async () => {
    try {
      const customerId = localStorage.getItem("c_id");
      const restaurantIds = data.map((item) => item.restaurant_id).join(",");
      const mycart = CartList.map((item) => ({
        fooddetail_id: item.FoodDetailId,
        quantity: item.Quantity,
      }));

      const formData = new FormData();
      formData.append("resids", restaurantIds);
      formData.append("customerId", customerId);
      formData.append("mycart", JSON.stringify(mycart));
      formData.append("Time", Time);

      const response = await axios.post(
        "http://localhost/WebApplication2/api/Customer/PlaceOrder",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Navigate to order tracking page if order is placed successfully
        navigate("/myOrders");
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Navbarcustomer />
      <Container className="py-3">
        <Card className="mb-3">
          <Card.Body style={{backgroundColor:theme==="light"?"white":"#292929",color:theme==="light"?"black":"#fff",border:`2px solid ${theme==="light"?"white":"gold"}`}}>
            <Form >
              <Form.Group controlId="formAddress">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929"}}
                  type="text"
                  placeholder="Enter your shipping address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="outline-danger rounded-5"
                style={{letterSpacing:"0.5rem",fontFamily:"cursive"}}
                className="w-100 mt-3"
                onClick={() => handleAddress()}
              >
                Confirm your Address
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body style={{backgroundColor:theme==="light"?"white":"#292929",color:theme==="light"?"black":"#fff",border:`2px solid ${theme==="light"?"white":"gold"}`}}>
            <h5>Payment Method</h5>
            <Card className="mb-2">
              <Card.Body style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929"}} className="text-center">Please make Cash ready  at the time of Delivery</Card.Body>
            </Card>
          </Card.Body>
        </Card>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <Card className="mb-3" key={index}>
                <Card.Body style={{backgroundColor:theme==="light"?"white":"#292929",color:theme==="light"?"black":"#fff",border:`2px solid ${theme==="light"?"white":"gold"}`}}>
                  <h5>Order {item.restaurant_id}:</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between" style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929",borderBottom:`1px solid ${theme==="light"?"black":"white"}`}}>
                      <div>Total Price:</div>
                      <div>Rs. {item.total_price}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between" style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929",
                      borderBottom:`1px solid ${theme==="light"?"black":"white"}`}}>
                      <div>Total Quantity:</div>
                      <div>{item.total_quantity}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between" style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929",
                      borderBottom:`1px solid ${theme==="light"?"black":"white"}`}}>
                      <div>Shipping Fee:</div>
                      <div>Rs. 60</div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
        </div>

        <Card className="mb-3">
          <Card.Body style={{backgroundColor:theme==="light"?"white":"#292929",color:theme==="light"?"black":"#fff",border:`2px solid ${theme==="light"?"white":"gold"}`}}>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between" style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929",
                      borderBottom:`1px solid ${theme==="light"?"black":"white"}`}}>
                <div>Subtotal:</div>
                <div>Rs. {subtotal}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between"style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929",
                      borderBottom:`1px solid ${theme==="light"?"black":"white"}`}}>
                <div>Total Quantity:</div>
                <div>{totalQuantity}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between"style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929",
                      borderBottom:`1px solid ${theme==="light"?"black":"white"}`}}>
                <div>Total Shipping Fee:</div>
                <div>Rs. {totalShippingFee}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between font-weight-bold"style={{color:theme==="light"?"black":"white",backgroundColor:theme==="light"?"white":"#292929",
                      borderBottom:`1px solid ${theme==="light"?"black":"white"}`}}>
                <div>Total:</div>
                <div>Rs. {subtotal + totalShippingFee}</div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Button variant="outline-danger rounded-3" className="w-100" onClick={placeOrder}>
          Place Order
        </Button>
      </Container>
    </>
  );
}
