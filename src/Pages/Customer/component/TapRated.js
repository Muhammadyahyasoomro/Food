import React, { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";
import { Row, Col } from "react-bootstrap";

// Function to render star icons based on rating

export default function TapRated() {
  useEffect(() => {
    console.log("hello ");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // corrected header name
      },
    };

    fetch(
      "http://localhost/fooddeliverysystems/api/customer/Top10FoodItems",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("---top 10 fooditem s");
        // Assuming data is an array of food items received from the API
        console.log(data); // Ensure that you're getting the expected data
        setfoodcards(data); // Update foodCards state with the fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [foodCards, setfoodcards] = useState([
    // ... other card data
    {
      id: 1,
      title: "Pizza",
      rating: 5,
      type: "Restaurant",
      imageUrl: "https://picsum.photos/200/300?random=4",
    },

    // ... add more items with unique random numbers at the end of the URL
  ]);
  return (
    <>
      <h3
        className="text-center my-3 text-danger fs-2"
        style={{ fontWeight: "bold" }}
      >
        Top Rated
      </h3>
      <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>
        <Row className="d-flex flex-nowrap col-sm-10  my-2" style={{}}>
          {foodCards.map((item) => (
            <Col key={item.id}>
              {/* Set a fixed width for each card */}
              <FoodCard
                imageUrl={
                  item.f_image
                    ? `http://localhost/FoodDeliverySystems/Content/FoodItem/${
                        item.f_image //.split(".")[0]
                      }`
                    : ""
                }
                title={item.name}
                rating={item.foodRating}
                type={item.res_type}
                description={item.description}
                price={item.price}
                fooddetail_id={item.id}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
