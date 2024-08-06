import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [startedOrders, setStartedOrders] = useState([]);
  const IpAddress = "localhost";

  const res_id = localStorage.getItem("res_id");
  const Navigate = useNavigate();
  useEffect(() => {
    fetch(
      `http://${IpAddress}/WebApplication2/api/restaurant/PendingOrders?restaurantID=${res_id}`
      
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        setPendingOrders(data);
        console.log(pendingOrders);
      })
      .catch((error) => {
        console.error("Error fetching pending orders:", error);
      });
  }, [res_id]);

  useEffect(() => {
    fetch(
      `http://${IpAddress}/WebApplication2/api/restaurant/startedOrders?restaurantID=${res_id}`
    
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        setStartedOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching pending orders:", error);
      });
  }, [res_id]);

  return (
    <>
      <Tabs
        defaultActiveKey="OrderInqueue"
        id="justify-tab-example"
        className="mb-5 justify-content-center px-4"
      >
        <Tab
          eventKey="OrderInqueue"
          className="text-center fs-6"
          title="Order InQueue"
        >
          <h3>Order InQueue</h3>
          {pendingOrders.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">f_readyTime</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.TimeLeft}</td>
                    <td>{order.quantity}</td>

                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          fetch(
                            `http://${IpAddress}/WebApplication2/api/Restaurant/UpdateStatus?orderId=${order.id}`,
                            {
                              method: "POST", // Specifies the HTTP method as PUT
                              headers: {
                                "Content-Type": "application/json", // Sets the Content-Type header
                              },
                              // Optionally, you can include a request body if necessary
                              // body: JSON.stringify({ /* data to send in the request body */ })
                            }
                          )
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error("Network response was not ok");
                              }
                              return response.json();
                            })
                            .then((data) => {
                              console.log("Response:", data);
                              setStartedOrders(data);
                            })
                            .catch((error) => {
                              console.error(
                                "Error fetching pending orders:",
                                error
                              );
                            });
                          window.location.reload();
                        }}
                        className="btn btn-outline-danger"
                      >
                        Start
                      </button>
                      <button className="btn btn-outline-danger mx-2">
                        See Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending orders available.</p>
          )}
        </Tab>

        <Tab
          eventKey="order started"
          title="order started"
          className=" text-center fs-6"
          style={{}}
        >
          <h3>Order Started</h3>
          {startedOrders.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Pending</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {startedOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.TimeLeft}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                          Navigate("/SeeDetails", {
                            state: { orderid: order.id },
                          });
                        }}
                      >
                        See Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No started orders available.</p>
          )}
        </Tab>
      </Tabs>
    </>
  );
}
