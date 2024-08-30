import React, { useState, useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Table,
} from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import Navbarcustomer from "./component/NavbarCustomer";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet-routing-machine";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [scheduleOrders, setScheduleOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ action: "", id: null });
  const [orderDetails, setOrderDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapData, setMapData] = useState(null);
  const mapRef = useRef(null); // Ref for map container

  useEffect(() => {
    // Fetch orders on component mount
    fetchOrders();
    fetchScheduledOrders();
  }, []);

  const fetchOrders = () => {
    fetch(
      `http://localhost/WebApplication2/api/customer/GetMySimpleOrder?customer_ID=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const fetchScheduledOrders = () => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/GetAllJobs?Customer_id=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => setScheduleOrders(data))
      .catch((error) =>
        console.error("Error fetching scheduled orders:", error)
      );
  };

  const navigate = useNavigate();

  const openModal = (action, id) => {
    setModalInfo({ action, id });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleOrderDetails = (orderId) => {
    fetch(
      `http://localhost/WebApplication2/api/customer/GetMyOrderDetails?oid=${orderId}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch order details");
        return response.json();
      })
      .then((data) => {
        setOrderDetails(data);
        setDetailsError("");
        setShowDetailsModal(true);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setDetailsError(
          "Failed to load order details. Please try again later."
        );
        setShowDetailsModal(true);
      });
  };

  const trackOrder = (orderId) => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/GetMapDetails?orderId=${orderId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
        setShowMapModal(true);
      })
      .catch((error) => {
        console.error("Error fetching map details:", error);
        alert("Failed to load map details.");
      });
  };

  const handleCancelOrder = () => {
    const { id } = modalInfo;
    fetch(
      `http://localhost/WebApplication2/api/customer/CancelMYOrder?orderId=${id}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(`Order ${id} has been canceled.`);
          setOrders(orders.filter((order) => order.id !== id));
        } else if (response.status === 404) {
          alert(`Cannot cancel order ${id} because the order is in progress.`);
        } else {
          alert(`Failed to cancel order ${id}.`);
        }
      })
      .catch((error) => {
        console.error(`Error canceling order ${id}:`, error);
        alert(`Error canceling order ${id}.`);
      });
    closeModal();
  };

  const handleDeleteSchedule = () => {
    const { id } = modalInfo;
    fetch(
      `http://localhost/WebApplication2/api/Customer/DeleteJob?jobName=${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(`Schedule ${id} has been deleted.`);
          setScheduleOrders(
            scheduleOrders.filter((schedule) => schedule["Job Name"] !== id)
          );
        } else {
          alert(`Failed to delete schedule ${id}.`);
        }
      })
      .catch((error) => {
        console.error(`Error deleting schedule ${id}:`, error);
        alert(`Error deleting schedule ${id}.`);
      });
    closeModal();
  };

  // Function to initialize and display the Leaflet map
  const renderMap = () => {
    if (!mapRef.current || !mapData) return;

    // Clear previous map instance
    mapRef.current.innerHTML = "";

    // Initialize the map
    const map = L.map(mapRef.current).setView(
      [mapData.Customerdata.latitude, mapData.Customerdata.longitude],
      13
    );

    // Add a tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Add routing to display the path
    L.Routing.control({
      waypoints: [
        L.latLng(mapData.Customerdata.latitude, mapData.Customerdata.longitude),
        L.latLng(mapData.riderdata.latitude, mapData.riderdata.longitude),
      ],
      lineOptions: {
        styles: [{ color: "green", weight: 5 }],
      },
      show: false,
      routeWhileDragging: true,
      createMarker: () => null, // No markers
    }).addTo(map);
  };

  useEffect(() => {
    if (showMapModal) renderMap();
  }, [showMapModal, mapData]);

  return (
    <>
      <Navbarcustomer />

      <Container className="align-items-center justify-content-center">
        <Tabs
          defaultActiveKey="myorders"
          className="align-items-center justify-content-center"
          id="order-tabs"
        >
          <Tab eventKey="myorders" title="My Orders">
            <Row className="d-flex flex-column align-items-center">
              {orders.length > 0 &&
                orders.map((order) => (
                  <Col sm={12} md={6} lg={4} key={order.id} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>Order</Card.Title>
                        <Card.Text>Status: {order.status}</Card.Text>
                        <Card.Text>Time Left: {order.TimeLeft}</Card.Text>
                        <Button
                          variant="danger"
                          className="me-2"
                          onClick={() => openModal("cancelOrder", order.id)}
                        >
                          Cancel Order
                        </Button>
                        {order.status === "pickedup" && (
                          <Button
                            variant="primary"
                            onClick={() => trackOrder(order.id)}
                          >
                            Track Order
                          </Button>
                        )}
                        <Button
                          variant="secondary"
                          onClick={() => handleOrderDetails(order.id)}
                        >
                          See details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Tab>
          <Tab eventKey="myschedule" title="My Schedule">
            <Row className="d-flex flex-column align-items-center">
              {scheduleOrders.length > 0 &&
                scheduleOrders.map((schedule, index) => (
                  <Col sm={12} md={6} lg={4} key={index} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title className="fw-bold">
                          {schedule["Schedule Name"]}
                        </Card.Title>
                        <Table striped bordered hover size="sm">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Schedule Name:</strong>
                              </td>
                              <td>{schedule["Schedule Name"]}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Description:</strong>
                              </td>
                              <td>{schedule.Description}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Frequency Type:</strong>
                              </td>
                              <td>{schedule["Frequency Type"]}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>End Date:</strong>
                              </td>
                              <td>{schedule["End Date"]}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <Button
                          variant="danger"
                          className="me-2"
                          onClick={() =>
                            openModal("deleteSchedule", schedule["Job Name"])
                          }
                        >
                          Delete Schedule
                          <Trash className="ms-1" />
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Tab>
        </Tabs>
      </Container>

      {/* Modal for Confirming Cancel/Delete */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalInfo.action === "cancelOrder"
              ? "Confirm Cancel Order"
              : "Confirm Delete Schedule"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {modalInfo.action === "cancelOrder"
            ? "cancel this order"
            : "delete this schedule"}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={
              modalInfo.action === "cancelOrder"
                ? handleCancelOrder
                : handleDeleteSchedule
            }
          >
            {modalInfo.action === "cancelOrder"
              ? "Cancel Order"
              : "Delete Schedule"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Order Details */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailsError ? (
            <p>{detailsError}</p>
          ) : orderDetails ? (
            <Table striped bordered hover size="sm">
              <tbody>
                {Object.entries(orderDetails).map(([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Map Modal */}
      <Modal
        show={showMapModal}
        onHide={() => setShowMapModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Track Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            id="map"
            style={{ height: "400px", width: "100%" }}
            ref={mapRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMapModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyOrders;
