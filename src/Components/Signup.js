import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const Navigate = useNavigate();
  const [rider, setRider] = useState({
    name: "",
    email: "",
    cnic: "",
    password: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [formValidated, setFormValidated] = useState(false);

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const phoneRegex = /^\d{10,14}$/;

    if (!rider.name) errors.name = "Name is required";
    if (!rider.email) errors.email = "Email is required";
    else if (!emailRegex.test(rider.email))
      errors.email = "Invalid email format";
    if (!rider.cnic) errors.cnic = "CNIC is required";
    else if (!cnicRegex.test(rider.cnic)) errors.cnic = "Invalid CNIC format";
    if (!rider.password) errors.password = "Password is required";
    else if (rider.password.length < 6)
      errors.password = "Password must be at least 6 characters long";
    if (!rider.phone) errors.phone = "Phone number is required";
    else if (!phoneRegex.test(rider.phone))
      errors.phone = "Invalid phone number";
    if (!rider.address) errors.address = "Address is required";
    else if (rider.address.length > 40)
      errors.address = "Address cannot exceed 40 characters";

    return errors;
  };

  const onCreateRider = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setFormValidated(true);
      axios
        .post("http://localhost/webapplication2/api/rider/signup", rider)
        .then((response) => {
          console.log(response.data);
          Navigate(`/LoginRider`);
        })
        .catch((error) => {
          console.error("Error creating rider: ", error);
        });
    } else {
      setErrors(validationErrors);
      setFormValidated(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRider((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card
              className="mt-5 bg-danger p-2"
              style={{ marginTop: 100, textAlign: "center" }}
            >
              <Form
                onSubmit={onCreateRider}
                noValidate
                validated={formValidated}
              >
                {Object.keys(errors).length > 0 && (
                  <Alert variant="danger">
                    {Object.values(errors).map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </Alert>
                )}
                <Form.Group controlId="formBasicName">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={rider.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={rider.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicCnic">
                  <Form.Control
                    type="text"
                    name="cnic"
                    placeholder="CNIC"
                    value={rider.cnic}
                    onChange={handleInputChange}
                    isInvalid={!!errors.cnic}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cnic}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={rider.password}
                    onChange={handleInputChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={rider.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicAddress">
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={rider.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="danger" className="px-5" type="submit">
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
