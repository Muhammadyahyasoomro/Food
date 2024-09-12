import React, { useState } from "react";
import { NavbarHome } from "./components/NavbarHome";
import { Card, Row, Col } from "react-bootstrap";

export default function RestaurantActiveStatus() {
  const [fromDate, setFromDate] = useState(
    () => new Date().toISOString().slice(0, 10) // Slices out the YYYY-MM-DD format
  );

  function adjustDate(date, days) {
    const adjustedDate = new Date(date); // Create a new Date object to avoid modifying the original date
    adjustedDate.setDate(adjustedDate.getDate() + days); // Add or subtract days
    return adjustedDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
  }

  const [toDate, setToDate] = useState(adjustDate(fromDate, 1));

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDate = (e) => {
    setToDate(e.target.value);
  };
  const handlePost = () => {
    fetch(
      `http://localhost/WebApplication2/api/restaurant/IamNotAvailabaleFrom?from=${fromDate}&to=${toDate}&id=${localStorage.getItem(
        "res_id"
      )}`,
      { method: "POST" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data == "updated") {
          alert("updated");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      <NavbarHome />
      <div className="container p-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-warning text-primary fs-4 text-center">
                Set Unavailability
              </Card.Header>
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col xs={12} sm={4}>
                    <Card.Title>From</Card.Title>
                  </Col>
                  <Col xs={12} sm={8}>
                    <input
                      type="date"
                      className="form-control"
                      value={fromDate}
                      onChange={handleFromDate}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs={12} sm={4}>
                    <Card.Title>To</Card.Title>
                  </Col>
                  <Col xs={12} sm={8}>
                    <input
                      type="date"
                      className="form-control"
                      value={toDate}
                      onChange={handleToDate}
                    />
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center">
                <button
                  className="btn btn-danger w-100 rounded"
                  onClick={handlePost}
                >
                  Update
                </button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
