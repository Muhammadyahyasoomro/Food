import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Display } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    c_name: "",
    c_email: "",
    c_password: "",
    phoneno: "",
    address: "",
    disease: "",
  });
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchAreaName = async (latitude, longitude) => {
    const apiKey = "AIzaSyDUzYaiX303nr6XqMvtl8OEgFYIKc2scgI";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const area = data.results[0].address_components.find(
        (component) =>
          component.types.includes("sublocality") ||
          component.types.includes("locality")
      );
      return area ? area.long_name : "DefaultArea";
    }
    return "DefaultArea";
  };

  const createPolygon = (latitude, longitude, radius = 5) => {
    const EARTH_RADIUS = 6371; // Earth's radius in km
    const d = radius / EARTH_RADIUS; // angular distance in radians
    const coordinates = [];

    for (let i = 0; i < 360; i += 72) {
      // 72 degrees step for 5 points
      const bearing = i * (Math.PI / 180); // convert degrees to radians
      const latRadians = latitude * (Math.PI / 180); // convert latitude to radians
      const lonRadians = longitude * (Math.PI / 180); // convert longitude to radians

      const newLat = Math.asin(
        Math.sin(latRadians) * Math.cos(d) +
          Math.cos(latRadians) * Math.sin(d) * Math.cos(bearing)
      );
      const newLon =
        lonRadians +
        Math.atan2(
          Math.sin(bearing) * Math.sin(d) * Math.cos(latRadians),
          Math.cos(d) - Math.sin(latRadians) * Math.sin(newLat)
        );

      coordinates.push({
        latitude: newLat * (180 / Math.PI), // convert back to degrees
        longitude: newLon * (180 / Math.PI), // convert back to degrees
      });
    }

    return coordinates;
  };

  const onCreateCustomer = async (event) => {
    event.preventDefault();

    //setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", customer.c_name);
    formData.append("email", customer.c_email);
    formData.append("password", customer.c_password);
    formData.append("phone", customer.phoneno);
    formData.append("address", customer.address);
    formData.append("disease", customer.disease);

    if (lat !== null && lon !== null) {
      formData.append("latitude", lat);
      formData.append("longitude", lon);
    }

    try {
      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/customer/signup`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Signup response:", data);

      const latestCustomer = await fetchLatestCustomer(lat, lon);

      //      const polygonExists = await checkIfInPolygon(lat, lon);

      //    const areaName = await fetchAreaName(lat, lon);

      // if (polygonExists) {
      //   await updateCustomerZones(
      //     lat,
      //     lon,
      //     latestCustomer.customer_id,
      //     areaName
      //   );
      // } else {
      //   const workingZone = createPolygon(lat, lon, 5); // Create a 5 km radius polygon
      //   await updateCustomerZones(
      //     lat,
      //     lon,
      //     latestCustomer.id,
      //     areaName,
      //     workingZone
      //   );
      // }

      navigate("/LoginCustomer");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestCustomer = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/customer/GetLatestCustomer?lat=${latitude}&lon=${longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Latest customer data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching latest customer:", error);
    }
  };

  const checkIfInPolygon = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/customer/CheckForPolygon?latitude=${latitude}&longitude=${longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        // Assuming 404 means no polygon found
        return false;
      }

      const data = await response.json();
      console.log("Polygon check data:", data);
      return data.length > 0;
    } catch (error) {
      console.error("Error checking polygon:", error);
      return false;
    }
  };

  const updateCustomerZones = async (
    latitude,
    longitude,
    customerId,
    areaName,
    workingZone = null
  ) => {
    try {
      if (!workingZone) {
        workingZone = createPolygon(latitude, longitude, 5);
      }

      const formData = new FormData();
      formData.append("workingZone", JSON.stringify(workingZone));
      formData.append("restaurant_id", customerId); // Ensure this is the correct ID
      formData.append("areaname", areaName);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      console.log("Form Data being sent to UpdateCustomerZones:", {
        workingZone,
        restaurant_id: customerId,
        areaname: areaName,
        latitude,
        longitude,
      });

      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/Customer/UpdateCustomerZones`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Update zones response:", data);
    } catch (error) {
      console.error("Error updating zones:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(customer);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card
            className="mt-5 bg-danger p-2"
            style={{ marginTop: 100, textAlign: "center" }}
          >
            <Form onSubmit={onCreateCustomer}>
              <Form.Group controlId="formBasicName">
                <Form.Control
                  className="m-1"
                  type="text"
                  name="c_name"
                  placeholder="Name"
                  value={customer.c_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  className="m-1"
                  type="text"
                  name="c_email"
                  placeholder="Email"
                  value={customer.c_email}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  className="m-1"
                  type="password"
                  name="c_password"
                  placeholder="Password"
                  value={customer.c_password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPhone">
                <Form.Control
                  className="m-1"
                  type="text"
                  name="phoneno"
                  placeholder="Phone Number"
                  value={customer.phoneno}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicAddress">
                <Form.Control
                  className="m-1"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={customer.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicDisease">
                <Row className="fs-5 container  text-white">
                  Do you have any Disease?
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
                  <Col className="fs-4 text-white">
                    <input
                      type="radio"
                      name="disease"
                      onChange={handleInputChange}
                      value="bp"
                    />
                    BP{" "}
                  </Col>
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

              <Button
                className="m-1"
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Customer"}
              </Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
