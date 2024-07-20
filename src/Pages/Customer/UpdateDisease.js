import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { NavbarHome } from "../Restaurant/components/NavbarHome";
import { useNavigate } from "react-router-dom";

export default function UpdateDisease() {
  const handleInputChange = (event) => {
    setDisease(event.target.value);
    console.log(disease, "is updating");
  };
  const Navigate = useNavigate();
  const handleUpdate = () => {
    fetch(
      `http://localhost/FoodDeliverySystems/api/customer/UpdateDisease?customer_id=${localStorage.getItem(
        "c_id"
      )}&disease=${disease}`,
      {
        method: "post",
      }
    ).then((response) => {
      if (response.status == 200) {
        console.log("updated successfully");
        Navigate(`/HomeCustomer`);
      }
    });
  };
  const FetchDisease = () => {
    fetch(
      `http://localhost/FoodDeliverySystems/api/customer/GetCustomerDisease?customer_id=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((Response) => {
        if (Response.ok) {
          return Response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        setDisease(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => FetchDisease, []);
  const [disease, setDisease] = useState();
  return (
    <>
      <NavbarHome />
      <div className="bg-danger container-md">
        <Form>
          <Form.Group controlId="formBasicDisease " className="p-3">
            <Row className="fs-5 container  text-white">
              Do you have Disease?
            </Row>
            <Row
              className="fs-4 text-white"
              style={{ display: "inline-list-item" }}
            >
              <Col>
                <input
                  type="radio"
                  name="disease"
                  onChange={handleInputChange}
                  value="lactose"
                />{" "}
                Lactose
              </Col>
            </Row>
            <Row>
              <Col className="fs-4 text-white">
                <input
                  type="radio"
                  name="disease"
                  onChange={handleInputChange}
                  value="bp"
                />
                BP{" "}
              </Col>
            </Row>
            <Row>
              {" "}
              <Col className="fs-4 text-white">
                {" "}
                <input
                  type="radio"
                  name="disease"
                  onChange={handleInputChange}
                  value="sugar"
                />{" "}
                sugar
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <button
          className="bg-primary text-white border border-0 rounded p-3"
          onClick={() => {
            handleUpdate();
          }}
        >
          Update
        </button>
      </div>
    </>
  );
}
