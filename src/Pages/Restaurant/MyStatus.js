import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Navbar } from "react-bootstrap";
import { NavbarHome } from "./components/NavbarHome";

export default function MyStatus() {
  // Step 1: Add state for start and end dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Step 2: Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Construct URL with query parameters
    const url = `http://localhost/WebApplication2/api/Restaurant/OffDayScheduler?id=${localStorage.getItem(
      "res_id"
    )}&status=true&startDate=${startDate}&endDate=${endDate}`;

    // Step 3: Make the API call
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Handle successful response
        alert("Status updated successfully!");
      } else {
        // Handle errors
        const errorData = await response.json();
        alert(`Error: ${errorData.Message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("API call failed:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <>
      <NavbarHome />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h1>OffDay Scheduler</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStartDate" className="mt-4">
                <Form.Label>Please select your leave period:</Form.Label>
                <Form.Label className="d-block">Start Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)} // Update state
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEndDate" className="mt-3">
                <Form.Label className="d-block">End Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)} // Update state
                  required
                />
              </Form.Group>
              <Button variant="danger" className="mt-4" type="submit">
                Set Status
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
