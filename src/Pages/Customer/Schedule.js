import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { Cart } from "react-bootstrap-icons";
import GlobalState from "./component/GlobalState";

import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { Plus, Dash, Trash } from "react-bootstrap-icons";
import Navbarcustomer from "./component/NavbarCustomer";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const meals = ["Breakfast", "Lunch", "Dinner"];

const Schedule = () => {
  const location = useLocation();
  const { CartList = [], updatedSchedule, orderData } = location.state || {};
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState(0);

  // Load the schedule from local storage
  const loadScheduleFromLocalStorage = () => {
    try {
      const savedSchedule = localStorage.getItem("WeeklySchedule");
      return savedSchedule ? JSON.parse(savedSchedule) : null;
    } catch (error) {
      console.error("Failed to parse schedule from localStorage:", error);
      return null;
    }
  };

  // Initialize the schedule with the CartList if nothing in local storage
  const initializeScheduleWithCartList = (cartList) => {
    return Array.from({ length: 7 }, () =>
      Array.from({ length: 3 }, () => ({
        time: "08:00",
        items: cartList.map((item) => ({
          ...item,
          quantity: item.Quantity,
          food: item.Name || item.food,
          image: item.Image,
          status: "Active",
        })),
      }))
    );
  };

  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = loadScheduleFromLocalStorage();
    return (
      updatedSchedule ||
      savedSchedule ||
      initializeScheduleWithCartList(CartList)
    );
  });

  useEffect(() => {
    localStorage.setItem("isschedule", false);
    if (updatedSchedule) {
      setSchedule(updatedSchedule);
    }
  }, [updatedSchedule]);

  // Update local storage whenever the schedule changes
  useEffect(() => {
    localStorage.setItem("WeeklySchedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleCartClick = () => {
    localStorage.setItem("isschedule", "true");
    navigate("/homecustomer", { state: { isschedule: true } });
  };

  const handleQuantityChange = (dayIndex, mealIndex, itemIndex, delta) => {
    setSchedule((prev) => {
      const newSchedule = prev.map((daySchedule, dIndex) =>
        daySchedule.map((mealSchedule, mIndex) =>
          dIndex === dayIndex && mIndex === mealIndex
            ? {
                ...mealSchedule,
                items: mealSchedule.items.map((item, iIndex) =>
                  iIndex === itemIndex
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
                ),
              }
            : mealSchedule
        )
      );
      return newSchedule;
    });
  };

  const handleAddNewItem = () => {
    if (orderData) {
      setSchedule((prev) => {
        const newSchedule = prev.map((daySchedule, dIndex) =>
          daySchedule.map((mealSchedule, mIndex) =>
            dIndex === selectedDay && mIndex === selectedMeal
              ? {
                  ...mealSchedule,
                  items: [
                    ...mealSchedule.items,
                    {
                      FoodDetailId: orderData.selectedOptionId,
                      food: orderData.name,
                      Quantity: orderData.quantity,
                      status: "Active",
                    },
                  ],
                }
              : mealSchedule
          )
        );
        return newSchedule;
      });
    } else {
      setSchedule((prev) => {
        const newSchedule = prev.map((daySchedule, dIndex) =>
          daySchedule.map((mealSchedule, mIndex) =>
            dIndex === selectedDay && mIndex === selectedMeal
              ? {
                  ...mealSchedule,
                  items: [
                    ...mealSchedule.items,
                    { food: "New Food", quantity: 1, status: "Active" },
                  ],
                }
              : mealSchedule
          )
        );
        return newSchedule;
      });
    }
  };

  const handleDeleteItem = (dayIndex, mealIndex, itemIndex) => {
    setSchedule((prev) => {
      const newSchedule = prev.map((daySchedule, dIndex) =>
        daySchedule.map((mealSchedule, mIndex) =>
          dIndex === dayIndex && mIndex === mealIndex
            ? {
                ...mealSchedule,
                items: mealSchedule.items.filter(
                  (item, iIndex) => iIndex !== itemIndex
                ),
              }
            : mealSchedule
        )
      );
      return newSchedule;
    });

    // Update local storage after removing the item
    try {
      const savedSchedule = localStorage.getItem("WeeklySchedule");
      if (savedSchedule) {
        const parsedSchedule = JSON.parse(savedSchedule);
        const updatedSchedule = parsedSchedule.map((daySchedule, dIndex) =>
          daySchedule.map((mealSchedule, mIndex) =>
            dIndex === dayIndex && mIndex === mealIndex
              ? {
                  ...mealSchedule,
                  items: mealSchedule.items.filter(
                    (item, iIndex) => iIndex !== itemIndex
                  ),
                }
              : mealSchedule
          )
        );
        localStorage.setItem("WeeklySchedule", JSON.stringify(updatedSchedule));
      }
    } catch (error) {
      console.error("Failed to update schedule in localStorage:", error);
    }
  };

  const handleConfirmSchedule = () => {
    const url = `http://localhost/WebApplication2/api/Customer/StartWeeklyScheduler?customer_id=${localStorage.getItem(
      "c_id"
    )}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.headers.get("Content-Length") === "0") {
          throw new Error("No content in response");
        }
        return response.json().catch(() => {
          throw new Error("Invalid JSON response");
        });
      })
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error making request:", error);
      });
  };

  const cancelSchedule = () => {
    const c_id = localStorage.getItem("c_id");
    console.log(schedule);
    if (!c_id) {
      console.error("Customer ID not found in localStorage");
      return;
    }

    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const url = `http://localhost/WebApplication2/api/Customer/RemoveSchedule?c_id=${c_id}`;

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.text().then((text) => (text ? JSON.parse(text) : null));
      })
      .then((result) => {
        console.log(result);
        window.alert("Deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete schedule:", error);
      });
  };

  const handleTimeChange = (dayIndex, mealIndex, newTime) => {
    setSchedule((prev) => {
      const newSchedule = prev.map((daySchedule, dIndex) =>
        daySchedule.map((mealSchedule, mIndex) =>
          dIndex === dayIndex && mIndex === mealIndex
            ? { ...mealSchedule, time: newTime }
            : mealSchedule
        )
      );
      return newSchedule;
    });
  };

  const handleToggleStatus = (dayIndex, mealIndex, itemIndex) => {
    setSchedule((prev) => {
      const newSchedule = prev.map((daySchedule, dIndex) =>
        daySchedule.map((mealSchedule, mIndex) =>
          dIndex === dayIndex && mIndex === mealIndex
            ? {
                ...mealSchedule,
                items: mealSchedule.items.map((item, iIndex) =>
                  iIndex === itemIndex
                    ? {
                        ...item,
                        status:
                          item.status === "Active" ? "Deactivated" : "Active",
                      }
                    : item
                ),
              }
            : mealSchedule
        )
      );
      return newSchedule;
    });
  };

  const handleScheduleOrder = () => {
    console.log("Schedule 2D Array:", schedule);

    const url =
      `http://localhost/WebApplication2/api/Customer/CreateWeeklyMenu?customerId=${localStorage.getItem("c_id")}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.headers.get("Content-Length") === "0") {
          throw new Error("No content in response");
        }
        return response.json().catch(() => {
          throw new Error("Invalid JSON response");
        });
      })
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error making request:", error);
      });
  };

  return (
    <>
      <Navbarcustomer />
      <Container>
        {orderData && (
          <div className="alert alert-success">
            Item selected: {orderData.name} (Quantity: {orderData.quantity})
          </div>
        )}
        <Tab.Container defaultActiveKey={selectedDay}>
          <Row>
            <Col md={2}>
              <Nav variant="pills" className="flex-column">
                {days.map((day, index) => (
                  <Nav.Item key={day}>
                    <Nav.Link
                      eventKey={index}
                      onClick={() => setSelectedDay(index)}
                    >
                      {day}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col md={10}>
              <Tab.Content>
                {days.map((day, dayIndex) => (
                  <Tab.Pane eventKey={dayIndex} key={dayIndex}>
                    <Tab.Container defaultActiveKey={selectedMeal}>
                      <Nav variant="tabs">
                        {meals.map((meal, mealIndex) => (
                          <Nav.Item key={meal}>
                            <Nav.Link
                              eventKey={mealIndex}
                              onClick={() => setSelectedMeal(mealIndex)}
                            >
                              {meal}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                      <Tab.Content>
                        {meals.map((meal, mealIndex) => (
                          <Tab.Pane eventKey={mealIndex} key={mealIndex}>
                            <Form.Control
                              type="time"
                              value={schedule[dayIndex][mealIndex].time}
                              onChange={(e) =>
                                handleTimeChange(
                                  dayIndex,
                                  mealIndex,
                                  e.target.value
                                )
                              }
                              className="mb-2"
                              style={styles.timeInput}
                            />
                            {schedule[dayIndex][mealIndex].items.map(
                              (item, itemIndex) => (
                                <Row
                                  key={itemIndex}
                                  className="mb-2 align-items-center"
                                >
                                  <Col xs={3}>
                                    <Image
                                      src={`http://localhost/WebApplication2/content/FoodItems/${item.image}`} // Adjust image source
                                      thumbnail
                                      style={{ width: "3rem", height: "3rem" }}
                                    />
                                  </Col>
                                  <Col xs={5}>{item.food}</Col>
                                  <Col
                                    xs={4}
                                    className="d-flex align-items-center"
                                  >
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      onClick={() =>
                                        handleQuantityChange(
                                          dayIndex,
                                          mealIndex,
                                          itemIndex,
                                          1
                                        )
                                      }
                                      style={styles.quantityButton}
                                    >
                                      <Plus />
                                    </Button>
                                    <span style={styles.quantityText}>
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      onClick={() =>
                                        handleQuantityChange(
                                          dayIndex,
                                          mealIndex,
                                          itemIndex,
                                          -1
                                        )
                                      }
                                      style={styles.quantityButton}
                                    >
                                      <Dash />
                                    </Button>
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteItem(
                                          dayIndex,
                                          mealIndex,
                                          itemIndex
                                        )
                                      }
                                      style={styles.deleteButton}
                                    >
                                      <Trash />
                                    </Button>
                                    <Button
                                      variant={
                                        item.status === "Active"
                                          ? "outline-success"
                                          : "outline-danger"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        handleToggleStatus(
                                          dayIndex,
                                          mealIndex,
                                          itemIndex
                                        )
                                      }
                                      style={styles.statusButton}
                                    >
                                      {item.status === "Active"
                                        ? "Deactivate"
                                        : "Activate"}
                                    </Button>
                                  </Col>
                                </Row>
                              )
                            )}
                            <Button
                              variant="danger"
                              className="mt-3"
                              onClick={handleAddNewItem}
                            >
                              Add New Food Item
                            </Button>
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    </Tab.Container>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <button
        className="floating-cart text-danger p-3"
        onClick={handleCartClick}
        style={{
          position: "fixed",
          top: "600px",
          right: "50px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 0 10px red",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <Cart style={{ width: "24px", height: "24px" }} />
      </button>
      <Popup
        trigger={
          <button
            style={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
            }}
            className="bg-danger text-white rounded border-0 p-2 fs-5 mx-2"
            onClick={handleScheduleOrder}
          >
            Schedule Order
          </button>
        }
        modal
        closeOnDocumentClick
      >
        {(close) => (
          <div className="popup-content m-3 p-3 border border-danger border-3 rounded bg-white">
            <p>
              Your Schedule is Created Successfully. Press Confirm to start your
              weekly scheduler.
            </p>
            <div className="d-flex justify-content-around mt-3">
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleConfirmSchedule();
                  close();
                }}
              >
                YES
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  cancelSchedule();
                  close();
                }}
              >
                NO
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

const styles = {
  timeInput: {
    textAlign: "center",
  },
  foodImage: {
    width: "100%",
  },
  quantityButton: {
    margin: "0 5px",
  },
  quantityText: {
    margin: "0 10px",
  },
  deleteButton: {
    marginLeft: "10px",
  },
  statusButton: {
    marginLeft: "10px",
  },
};

export default Schedule;
