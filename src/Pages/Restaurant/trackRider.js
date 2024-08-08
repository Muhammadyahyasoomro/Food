import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarHome } from "./components/NavbarHome";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

export default function TrackRider() {
  const location = useLocation();
  const [customerLocation, setCustomerLocation] = useState(null);
  const { state } = location;
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/webapplication2/api/restaurant/GetCustomerLocation?o_id=${state?.orderid}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        setCustomerLocation([data.latitude, data.longitude]);
      });
  }, [state]);

  const [phoneNo] = useState("923175412199");
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentLocation && customerLocation && !map) {
        const leafletMap = L.map("map").setView(currentLocation, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(leafletMap);

        L.Routing.control({
            waypoints: [
                L.latLng(currentLocation[0], currentLocation[1]), // Restaurant's location
                L.latLng(customerLocation[0], customerLocation[1]) // Customer's location
            ],
            routeWhileDragging: true,
            createMarker: function() { return null; }, // Hides markers
            show: false // Hides the sidebar
        }).addTo(leafletMap);

        setMap(leafletMap);
    }
}, [currentLocation, customerLocation, map]);


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
            <div id="map" style={{ height: "300px", width: "100%" }}></div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h6>RIDER STATUS</h6>
            <p>
              Picking up in: <strong>3.6km – 6 min</strong>
            </p>
            <div className="bg-success fs-4">
              Status: Ready to pickup
            </div>
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
