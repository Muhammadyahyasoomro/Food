import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalNavbar } from "../../GlobalNavbar";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage loader
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [login, setLogin] = useState({ c_email: "", c_password: "" });

  useEffect(() => {
    const email = localStorage.getItem("emailCustomer");
    const password = localStorage.getItem("passwordCustomer");
    if (email && password) {
      navigate("/HomeCustomer");
    }
  }, [navigate]);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position x", position.coords.latitude);
          console.log("position y", position.coords.longitude);
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signin = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const { c_email, c_password } = login;

    axios
      .get(
        `https://www.quettacafe.com/FoodDeliverySystems/api/Customer/Login`,
        {
          email: c_email,
          password: c_password,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const { customer_id, disease } = response.data;
          localStorage.setItem("c_id", customer_id);
          localStorage.setItem("emailCustomer", c_email);
          localStorage.setItem("passwordCustomer", c_password);
          localStorage.setItem("lat", location.lat);
          localStorage.setItem("lon", location.lon);
          localStorage.setItem("disease", disease);
          navigate("/HomeCustomer");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <>
      <GlobalNavbar />
      <Container className="signup-container mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="mx-5 my-5 text-center align-items-md-center">
              <div className="mb-md-0 mb-4">
                <img
                  src={require("../../../Components/assets/rider/Group 503.png")}
                  className="w-130"
                  alt="Customer.png"
                />
              </div>
              <div className="form d-flex flex-row justify-content-center my-3">
                <Form onSubmit={signin} className="bg-danger p-2 rounded">
                  <Form.Group className="mb-3" controlId="exampleInputEmail1">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="c_email"
                      value={login.c_email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleInputPassword1"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="c_password"
                      value={login.c_password}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn btn-danger"
                    style={{
                      background: "#EF5A5A",
                      borderRadius: 20,
                      borderWidth: 0,
                      width: "100%",
                    }}
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
