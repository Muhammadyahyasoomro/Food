import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  List,
  Cart,
  CheckCircle,
  CheckCircleFill,
} from "react-bootstrap-icons";

export default function Checkout() {
  return (
    <>
      <div className="checkout-container">
        <Row className="justify-content-between">
          <Col className="text-center bg-danger text-white">
            <div className="checkout-icon">
              <div>
                <CheckCircleFill size={32} className="mx-2" />
                <span>Menu</span>
              </div>
            </div>
          </Col>
          <Col className="text-center bg-danger text-white">
            <div className="checkout-icon">
              <CheckCircleFill size={32} className="mx-2" />
              <span>Cart</span>
            </div>
          </Col>
          <Col className="text-center bg-warning text-white">
            <div className="checkout-icon">
              <CheckCircle size={32} />
              <span>Checkout</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
