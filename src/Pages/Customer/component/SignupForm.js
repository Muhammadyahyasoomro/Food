import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

export const SignupForm = () => {
  const { theme } = useTheme();
  const API_BASE_URL = `http://localhost/WebApplication2/api`;
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    c_name: "",
    c_email: "",
    c_password: "",
    phoneno: "",
    address: "",
    disease: [],
  });

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const diseases = ["Lactose", "BP", "Sugar", "Gluten", "Nut Allergy", "Celiac"];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDiseaseChange = (event) => {
    const selectedDiseases = Array.from(event.target.selectedOptions, (option) => option.value);
    setCustomer((prevState) => ({
      ...prevState,
      disease: selectedDiseases,
    }));
  };

  const removeDisease = (diseaseToRemove) => {
    setCustomer((prevState) => ({
      ...prevState,
      disease: prevState.disease.filter((disease) => disease !== diseaseToRemove),
    }));
  };

  const onCreateCustomer = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const diseaseString = customer.disease.join(",");
      const response = await fetch(
        `${API_BASE_URL}/customer/Signup?name=${customer.c_name}&email=${customer.c_email}&password=${customer.c_password}&phone=${customer.phoneno}&address=${customer.address}&disease=${diseaseString}&lat=${lat}&lon=${lon}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign up customer.");
      }

      const data = await response.json();
      console.log("Signup response:", data);

      navigate("/LoginCustomer");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="" style={{marginTop:"5rem"}}>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="p-4 shadow-lg" style={{ backgroundColor: theme === "light" ? "#f8f9fa" : "#343a40", color: theme === "light" ? "#000" : "#fff" }}>
            <h2 className="text-center mb-4">Customer Signup</h2>
            <Form onSubmit={onCreateCustomer}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="c_name"
                  placeholder="Enter your name"
                  value={customer.c_name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="c_email"
                  placeholder="Enter your email"
                  value={customer.c_email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="c_password"
                  placeholder="Enter your password"
                  value={customer.c_password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPhone" className="mt-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneno"
                  placeholder="Enter your phone number"
                  value={customer.phoneno}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicAddress" className="mt-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={customer.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicDisease" className="mt-3">
                <Form.Label>Select Diseases (if any)</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="disease"
                  value={customer.disease}
                  onChange={handleDiseaseChange}
                  className="form-select"
                >
                  {diseases.map((disease) => (
                    <option key={disease} value={disease}>
                      {disease}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Row className="mt-2 g-1">
                {customer.disease.map((disease) => (
                  <Col key={disease} className="mb-2">
                    <Badge
                      pill
                      bg="success"
                      onClick={() => removeDisease(disease)}
                      className="fs-6 p-2"
                      style={{ cursor: "pointer" }}
                    >
                      {disease} &times;
                    </Badge>
                  </Col>
                ))}
              </Row>

              <Button className="mt-4 w-100" variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
              </Button>
              {error && <p className="text-danger mt-3">{error}</p>}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default SignupForm;
