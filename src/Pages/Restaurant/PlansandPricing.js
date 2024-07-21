import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarHome } from "./components/NavbarHome";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

export default function PlansandPricing() {
  const Navigate = useNavigate();
  const location = useLocation();
  const weightOptions = [
    "small",
    "medium",
    "large",
    "xlarge",
    "half",
    "full",
    "double",
    "single",
    "slice",
  ];

  const { b_id } = location.state;
  const API_BASE_URL = "http://localhost/WebApplication2/api";
  const [unit, setUnit] = useState();
  const [Price, setPrice] = useState();
  const [ServePerPeople, setServeperPeople] = useState();
  const [readyTime, SetReadyTime] = useState();

  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/restaurant/AddFoodDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(PricingList), // Send the PricingList directly without wrapping it in an object
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);
        Navigate("/managelist");
      } else {
        // Handle HTTP errors
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error occurred while submitting:", error);
    }
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleServePerPeopleChange = (event) => {
    setServeperPeople(event.target.value);
  };

  const handleReadyTimeChange = (event) => {
    SetReadyTime(event.target.value);
  };

  const UpdateList = () => {
    // Assuming you have a unique identifier for each item, you can use a counter or generate a unique ID
    const uniqueId = Math.random().toString(36).substr(2, 9); // Generating a random unique ID

    setPricingList((prevList) => [
      ...prevList,
      {
        id: uniqueId, // Assigning the unique ID to the new item
        foodItem_id: b_id.id,
        unit: unit,
        price: Price,
        peopleperserving: ServePerPeople,
        f_readytime: readyTime,
      },
    ]);
    PricingList.map((item) => {
      console.log(item);
    });
  };

  const IPAdress = "localhost";
  const removeItem = (itemId) => {
    setPricingList((prevList) => prevList.filter((item) => item.id !== itemId));
  };
  const [PricingList, setPricingList] = useState([]);

  return (
    <div>
      <NavbarHome />
      <h3 className="text-center my-4">Plans And Pricing</h3>
      <div className="d-flex">
        <Container>
          <Row className="">
            <Col xs={10} md={6}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Define your Plans</Card.Title>

                  <div className="d-flex align-items-center justify-content-center my-4">
                    <label className="fs-5 mx-2">Unit</label>
                    <select
                      className="form-control border-danger"
                      style={{ outline: "none" }}
                      name="unit"
                      onChange={handleUnitChange}
                    >
                      <option value="">Choose...</option>
                      {weightOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                    <label className="fs-5 mx-2">KG</label>
                  </div>

                  <div className="d-flex align-items-center justify-content-center my-4">
                    <label className="fs-6 mx-2">ServePerPeople</label>
                    <input
                      type="number"
                      placeholder="i.e 1,3,5 peoplePerServing"
                      className="form-control border-danger"
                      style={{ outline: "none" }}
                      name="peopleperserving"
                      onChange={handleServePerPeopleChange}
                    />
                    <label className="mx-4"></label>
                  </div>

                  <div className="d-flex align-items-center justify-content-center my-4">
                    <label className="fs-5 mx-2">Cooking Time</label>
                    <input
                      type="number"
                      placeholder="Enter Time takes to Cook your Food"
                      className="form-control border-danger"
                      style={{ outline: "none", width: "20rem" }}
                      name="CookingTime"
                      onChange={handleReadyTimeChange}
                    />
                    <label className="mx-4"></label>
                  </div>
                  <div className="d-flex align-items-center justify-content-center my-4">
                    <label className="fs-5 mx-2">Price</label>
                    <input
                      type="number"
                      placeholder="Enter Time takes to Cook your Food"
                      className="form-control border-danger"
                      style={{ outline: "none", width: "20rem" }}
                      name="CookingTime"
                      onChange={handlePriceChange}
                    />
                    <label className="mx-4"></label>
                  </div>
                </Card.Body>
              </Card>
              <Button
                variant="danger"
                onClick={() => {
                  UpdateList();
                  console.log(b_id.id);
                }}
                className="mt-4 w-100"
              >
                +
              </Button>
            </Col>
            <Col>
              <div
                className=" justify-content-center text-center border border-danger"
                style={{}}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Unit</th>
                      <th scope="col">Price</th>
                      <th scope="col">ServePerPeople</th>
                      <th scope="col">CookingTime</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PricingList.map((Item) => (
                      <tr key={Item.id}>
                        <td>{Item.unit}</td>
                        <td>{Item.price}</td>
                        <td>{Item.peopleperserving}</td>
                        <td>{Item.f_readytime}</td>
                        <td>
                          <Trash onClick={() => removeItem(Item.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  className=""
                  variant="danger"
                  onClick={() => {
                    HandleSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
