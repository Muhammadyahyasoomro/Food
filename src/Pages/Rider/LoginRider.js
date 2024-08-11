import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../Components/Navbar";
import { GlobalNavbar } from "../GlobalNavbar";

export const LoginRider = () => {
  const [Login, setLogin] = useState({ c_email: "", c_password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Navigate = useNavigate();

  const Signin = (event) => {
    event.preventDefault();
    const email = Login.c_email;
    const password = Login.c_password;

    axios
      .get(
        `http://localhost/webapplication2/api/rider/Login?email=${email}&password=${password}`
      )
      .then((response) => {
        console.log(response.status + " login api call result");
        console.log(response);

        if (response.status === 200) {
          if (
            response.data !==
            "Rider not found with the provided email and password."
          ) {
            console.log("Rider ID:", response.data); // Log the rider ID
            localStorage.setItem("emailRider", email);
            localStorage.setItem("passwordRider", password);
            localStorage.setItem("riderId", response.data.id);
            Navigate("/WorkingZonePage");
          } else {
            console.error("Invalid email or password."); // Log error message
          }
        } else {
          console.error("Unexpected response:", response.statusText); // Log unexpected response
        }
      })
      .catch((error) => {
        console.error("Error signing in: ", error); // Log error message
      });
  };

  return (
    <>
      <GlobalNavbar />
      <Container className="signup-container mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="d-flex flex-column flex-md-row align-items-md-center">
              <div className="riderImage mb-md-0 mb-4">
                <img
                  src={require("../../Components/assets/rider/rider.png")}
                  className="w-130"
                  alt="Rider"
                />
              </div>
              <div
                className="form d-flex flex-row justify-content-center"
                style={{
                  background: "#FF4343",
                  padding: 25,
                  borderRadius: 10,
                  width: "100%",
                }}
              >
                <Form onSubmit={Signin}>
                  {" "}
                  {/* Added onSubmit event handler */}
                  <Form.Group className="mb-3" controlId="exampleInputEmail1">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="c_email" // Added name attribute
                      value={Login.c_email} // Bound value to state
                      onChange={handleInputChange} // Added onChange event handler
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleInputPassword1"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="c_password" // Added name attribute
                      value={Login.c_password} // Bound value to state
                      onChange={handleInputChange} // Added onChange event handler
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
                  >
                    Login
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
