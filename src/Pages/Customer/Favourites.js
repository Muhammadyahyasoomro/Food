import React, { useEffect, useState } from "react";
import { NavbarHome } from "../Restaurant/components/NavbarHome";
import { Row, Col, Card, Container } from "react-bootstrap";
import { FoodCard } from "./component/FoodCard";
import Navbarcustomer from "./component/NavbarCustomer";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Favourites() {
  const Navigate = useNavigate();
  const handleHomeNavigate = () => {
    Navigate("/HomeCustomer");
  };
  //theme
  const { theme } = useTheme();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost/WebApplication2/api/customer/GetFavouriteItems?customerId=${localStorage.getItem(
        "c_id"
      )}`,
      { method: "GET" }
    )
      .then((response) =>
        response.status == 200 ? response.json() : "Not Found"
      )
      .then((data) => {
        console.log("data", data);
        if (data != "Not Found") {
          setFavourites(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching favourite items:", error)
      );
  }, []);
  console.log("favourites.length", favourites.length);
  return (
    <>
      <Navbarcustomer />

      <Row style={{ marginLeft: "20rem" }}>
        {favourites.length > 0 && favourites ? (
          favourites.map((item) => (
            <Col
              key={item.favouriteId}
              xs={12}
              sm={6}
              md={4}
              lg={2}
              className="mb-4"
            >
              <FoodCard
                restaurantname={item.RestaurantName}
                imageUrl={`http://localhost/WebApplication2/Content/FoodItems/${item.FoodDetail.f_image}`}
                title={item.FoodDetail.name}
                rating={Math.floor(Math.random() * 3 + 1)}
                type={item.RestaurantType}
                price={item.MinPrice}
                fooddetail_id={item.FoodDetail.id}
                isFavorite={true} // Always true for items in the favourites list
                favouriteId={item.favouriteId} // ID of the favorite item
                // Callback to refresh the list
              />
            </Col>
          ))
        ) : (
          <>
            <Container>
              <Row>
                <Col lg={4} md={4} sm={4}></Col>
                <Col>
                  <Card
                    className="text-center mt-5 rounded border border-0 p-4"
                    style={{
                      backgroundColor:
                        theme !== "light" ? "#212121" : "#EFEFEF",
                      color: theme === "light" ? "#212121" : "#FFFFFF",
                    }}
                  >
                    <Card.Body>
                      <h3>No Favourites Found Add your Favourites</h3>
                    </Card.Body>

                    <button
                      onClick={handleHomeNavigate}
                      className="btn border  rounded"
                      style={{
                        backgroundColor:
                          theme !== "light" ? "#383838" : "green",
                        color: theme !== "light" ? "white" : "white",
                      }}
                    >
                      back to HomeScreen
                    </button>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </>
        )}
      </Row>
    </>
  );
}
