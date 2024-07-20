import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarHome } from "./components/NavbarHome";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TrackRider() {
  const [phoneNo] = useState("923175412199");
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const handleChatClick = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNo}&text=hi%20how%27re%20you%20you%20talking%20with%20bigbytes%20rider`;
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <NavbarHome />
      <Container>
        <Row className="mb-3">
          <Col>Tracking Rider</Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <p>Time left: 45 min</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col style={{ height: "300px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDUzYaiX303nr6XqMvtl8OEgFYIKc2scgI",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="KFC Shop"
              />
              <AnyReactComponent
                lat={59.925413}
                lng={30.308844}
                text="Drop-Off"
              />
            </GoogleMapReact>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h6>RIDER STATUS</h6>
            <p>
              Picking up in: <strong>3.6km – 6 min</strong>
            </p>
            <Button variant="danger" className="mb-3" block>
              Picked Up
            </Button>
            <p>
              Drop-Off: <strong>6.3km – 14 min</strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="danger" block onClick={handleChatClick}>
              CHAT
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
