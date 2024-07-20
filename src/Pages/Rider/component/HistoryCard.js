import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";

export default function HistoryCard() {
  return (
    <Container>
      <Row className="justify-content-center ">
        <Col md={8}>
          <Card className="custom-card red-bg text-center">
            <Card.Body>
              <Row className="custom-row">
                <Col xs={6} className="red-bg text-center">
                  Order ID
                </Col>
                <Col
                  xs={6}
                  className="red-border white-bg text-center"
                  style={{ borderRadius: 20 }}
                >
                  123456
                </Col>
              </Row>
              <Row className="custom-row">
                <Col xs={6} className="red-bg text-center">
                  Payment Type
                </Col>
                <Col
                  xs={6}
                  className="red-border white-bg text-center"
                  style={{ borderRadius: 20 }}
                >
                  Credit Card
                </Col>
              </Row>
              <Row className="custom-row">
                <Col xs={6} className="red-bg text-center">
                  Earned
                </Col>
                <Col
                  xs={6}
                  className="red-border white-bg text-center"
                  style={{ borderRadius: 20 }}
                >
                  $100.00
                </Col>
              </Row>
              <Row className="custom-row">
                <Col xs={6} className="red-bg text-center">
                  Rating
                </Col>
                <Col
                  xs={6}
                  className="red-border white-bg text-center "
                  style={{ borderRadius: 20 }}
                >
                  5 stars
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
