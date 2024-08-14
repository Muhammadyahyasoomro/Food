import React, { useState, useEffect } from "react";
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
import { Trash, Pencil } from "react-bootstrap-icons";
import Navbarcustomer from "./component/NavbarCustomer";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [scheduleOrders, setScheduleOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ action: "", id: null });
  const [orderDetails, setOrderDetails] = useState(null); // Order details state
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Details modal state
  const [detailsError, setDetailsError] = useState(""); // Error state for details fetch

  useEffect(() => {
    fetch(
      `http://localhost/WebApplication2/api/customer/GetMySimpleOrder?customer_ID=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));

    fetch(
      `http://localhost/WebApplication2/api/Customer/GetAllJobs?Customer_id=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setScheduleOrders(data);
      })
      .catch((error) =>
        console.error("Error fetching schedule orders:", error)
      );
  }, []);

  // Open modal with specific action and id
  const Navigate = useNavigate();
  const openModal = (action, id) => {
    setModalInfo({ action, id });
    setShowModal(true);
  };

  const trackOrder = () => {};

  // Close modal
  const closeModal = () => setShowModal(false);

  // Fetch order details and show in modal
  const handleOrderDetails = (orderId) => {
    fetch(
      `http://localhost/WebApplication2/api/customer/GetMyOrderDetails?oid=${orderId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        return response.json();
      })
      .then((data) => {
        setOrderDetails(data);
        setDetailsError("");
        setShowDetailsModal(true); // Show the details modal
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setDetailsError(
          "Failed to load order details. Please try again later."
        );
        setShowDetailsModal(true); // Show the details modal
      });
  };

  // Handle cancel order action
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

  // Handle delete schedule action
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
              {orders.map((order) => (
                <Col sm={12} md={6} lg={4} key={order.id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title className="">Order </Card.Title>
                      <Card.Text>Status: {order.status}</Card.Text>
                      <Card.Text>Time Left: {order.TimeLeft}</Card.Text>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => openModal("cancelOrder", order.id)}
                      >
                        Cancel Order
                      </Button>
                      {order.status === "accepted" && (
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
              {scheduleOrders.length>0&&scheduleOrders.map((schedule, index) => (
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
                              <strong>Day:</strong>
                            </td>
                            <td>{schedule.Day}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Start Time:</strong>
                            </td>
                            <td>{schedule["Start Time"]}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="danger"
                          className="me-2"
                          onClick={() =>
                            openModal("deleteSchedule", schedule["Job Name"])
                          }
                        >
                          <Trash /> Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Container>

      {/* Modal for confirming actions */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalInfo.action === "cancelOrder" && (
            <p>Are you sure you want to cancel order {modalInfo.id}?</p>
          )}
          {modalInfo.action === "deleteSchedule" && (
            <p>Are you sure you want to delete schedule {modalInfo.id}?</p>
          )}
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
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for order details */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailsError ? (
            <p className="text-danger">{detailsError}</p>
          ) : orderDetails ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item) => (
                  <tr key={item.ItemId}>
                    <td>{item.Name}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.Price}</td>
                    <td>
                      <img
                        src={`http://localhost/WebApplication2/Content/FoodItem/${item.Image}`}
                        alt={item.Name}
                        style={{ width: "100px" }}
                      />
                    </td>
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
    </>
  );
};

export default MyOrders;
