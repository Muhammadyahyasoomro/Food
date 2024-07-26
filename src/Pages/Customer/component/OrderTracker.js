import React, { useDebugValue } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CartFill, ListCheck } from "react-bootstrap-icons";
import { useTheme } from "../../../context/ThemeContext";
const OrderTracker = () => {
  const {theme}=useTheme();
  return (
    <div style={{ height: "50px", width: "100%", backgroundColor: theme==="light"?"white":"#292929" }}>
      <Container fluid>
        <Row style={{ backgroundColor: "orange" }}>
          <Col className="text-center" style={{ backgroundColor: "red" }}>
            {" "}
            <ListCheck size={30} color="white" />
          </Col>
          <Col
            className="border border-0 text-center rounded-end"
            style={{ backgroundColor: "red", color: "orange" }}
          >
            <CartFill size={30} color="white" />{" "}
          </Col>
          <Col className="text-center" style={{ color: "white" }}>
            Checkout
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default OrderTracker;
