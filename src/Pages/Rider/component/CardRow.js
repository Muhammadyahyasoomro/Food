import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function CardRow() {
  return (
    <Container className="justify-content-center" style={{ marginLeft: "25%" }}>
      {" "}
      {/* Centering the Container */}
      <Row
        className="sm-6 border border-danger rounded bg-transparent text-center"
        style={{ maxWidth: "50%" }}
      >
        <Col className="border-0 rounded bg-danger text-center align-center px-4 py-2 ">
          Order ID
        </Col>
        <Col className="border-0 rounded bg-white text-danger text-center px-4 py-2">
          1231231
        </Col>
      </Row>
    </Container>
  );
}
