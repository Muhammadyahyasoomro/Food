import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../../Components/Navbar";

export const LoginForm = () => {
  const [login, setLogin] = useState({ res_email: "", res_password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    const email = login.res_email;
    const password = login.res_password;
    var IpAddress = "localhost";
    axios
      .post(
        `http://localhost/WebApplication2/api/restaurant/Login?email=${email}&password=${password}`
      )
      .then((response) => {
        console.log(response.status + " login api call result");
        console.log(response.data.restaurantId + " restaurantid");
        console.log("email" + email + "    password : " + password);
        if (response.status === 200) {
          var resid = response.data.restaurantId;
          localStorage.setItem("res_id", resid);
          localStorage.setItem("email", email);
        
          navigate("/HomeRestaurant");
        }
        // Handle success, maybe redirect or show a success message
      })
      .catch((error) => {
        console.error("Error signing in: ", error); // Handle error, maybe show an error message to the user
      });
  };

  return (
    <>
      <Container className="signup-container mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={4}>
            <div className="text-center mb-4 d-flex justify-content-center mt-2">
              <img
                src={require("../../../Components/assets/rider/Group 502.png")}
                className="w-50"
                alt="Rider"
              />
            </div>
            <div className="bg-warning p-4 rounded">
              <Form onSubmit={signIn}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="res_email"
                    value={login.res_email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="res_password"
                    value={login.res_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button
                  style={{
                    backgroundColor: "red",
                  }}
                  variant="danger"
                  type="submit"
                  className="w-100"
                >
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
