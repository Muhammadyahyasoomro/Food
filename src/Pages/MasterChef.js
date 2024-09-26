import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Select from "react-select";

export default function MasterChef() {
  const [Type, setType] = useState(false);
  const [resid, setResid] = useState(1);
  const [foodid, setfoodid] = useState(1);

  useEffect(() => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/RestaurantList?type=${Type}`
    )
      .then((response) => response.json())
      .then((data) => setRestaurantList(data));
  }, [Type]);
  useEffect(() => {
    fetch(
      `http://localhost/WebApplication2/api/Customer/FoodList?resid=${resid}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFoodList(data);
        console.log(FoodList);
      });
  }, [resid]);

  const [RestaurantList, setRestaurantList] = useState([]);
  const [FoodList, setFoodList] = useState([]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [rating, setfoodRating] = useState();
  return (
    <>
      <div className="NewRole fs-2 text-center m-2 ">New Role Master Chef</div>
      <div className="RestaurantSelect text-center">
        <button
          className="p-2 border border-rounded rounded-2"
          style={{
            backgroundColor: Type === true ? "red" : "white",
            color: Type === true ? "white" : "black",
          }}
          onClick={() => {
            setType(true);
          }}
        >
          HomeChef
        </button>
        <button
          className="p-2 border border-rounded rounded-2"
          style={{
            backgroundColor: Type === false ? "red" : "white",
            color: Type === false ? "white" : "black",
          }}
          onClick={() => {
            setType(false);
          }}
        >
          Restaurant Chef
        </button>
      </div>
      {/*Restaurant DDp*/}
      <div className="d-flex mt-3" style={{ marginLeft: "20rem" }}>
        <Row className="text-center">
          <Col className="d-flex mx-5">
            <label className="px-2 fs-4 ">
              {Type ? <>HomeChef</> : <>Restaurant Chef</>}
            </label>
            <div style={{ width: "200px" }} className="col">
              <Select
                options={RestaurantList}
                onChange={(restaurant) => {
                  setSelectedRestaurant(restaurant);
                  setResid(selectedRestaurant?.values);
                  setResid(restaurant.values);
                }}
                placeholder="Select category"
              />
              {resid}
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <Col className="d-flex mx-5"></Col>
        </Row>
      </div>
      {/*fooditem DDp*/}
      {FoodList.length > 0 && FoodList && (
        <div className="foodselect d-flex " style={{ marginLeft: "20rem" }}>
          <Row className="text-center">
            <Col></Col>
            <Col className="d-flex mx-5">
              <label className="px-2 fs-4 ">{<>FoodItem</>}</label>
              <div style={{ width: "200px" }} className="col">
                <Select
                  options={FoodList}
                  onChange={(food) => {
                    setSelectedFood(food);
                    setfoodid(selectedFood?.values);
                    setfoodid(food.values);
                  }}
                  placeholder="Select category"
                />
                {foodid}
              </div>
            </Col>
            <Col></Col>
          </Row>
        </div>
      )}
      {/*foodRating*/}
      {foodid && (
        <div>
          <Row>
            <Col></Col>

            <Col className="d-flex mx-1">
              <p>Rate</p>
              <div style={{ width: "200px" }} className="col">
                <Select
                  options={[
                    { label: "1", values: 1 },
                    { label: "2", values: 2 },
                    { label: "3", values: 3 },
                    { label: "4", values: 4 },
                    { label: "5", values: 5 },
                  ]}
                  onChange={(rating) => {
                    setfoodRating(rating?.values);
                  }}
                  placeholder="Rate food out of 5"
                />
                {rating}
              </div>
            </Col>
            <Col></Col>
          </Row>
        </div>
      )}
      <div className="text-center p-5 m-5">
        <button
          disabled={rating && foodid ? false : true}
          onClick={() => {
            fetch(
              `http://localhost/WebApplication2/api/Customer/ChefRating?fooditemid=${foodid}&rating=${rating}`,
              { method: "POST" }
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                alert(`status : fooditem Rated successfully`);
              });
          }}
          className="btn btn-outline-success p-2 border border-4 border-rounded rounded border-success container"
        >
          Save
        </button>
      </div>
    </>
  );
}
