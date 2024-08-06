import React, { useEffect, useState } from "react";
import { NavbarHome } from "../Restaurant/components/NavbarHome";
import { Row, Col } from "react-bootstrap";
import { FoodCard } from "./component/FoodCard";
import Navbarcustomer from "./component/NavbarCustomer";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch(
      `http://WebApplication2/WebApplication2/api/customer/GetFavouriteItems?customerId=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFavourites(data);
      })
      .catch((error) =>
        console.error("Error fetching favourite items:", error)
      );
  }, []);

  const handleToggleFavorite = () => {
    // Refresh the list after a change
    fetch(
      `http://localhost/WebApplication2/api/customer/GetFavouriteItems?customerId=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFavourites(data);
      })
      .catch((error) =>
        console.error("Error fetching favourite items:", error)
      );
  };

  return (
    <>
      <Navbarcustomer />
      <Row>
        {favourites.map((item) => (
          <Col
            key={item.favouriteId}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
            <FoodCard
              imageUrl={`http://localhost/WebApplication2/Content/FoodItem/${item.f_image}`}
              title={item.food_name}
              rating={item.foodRating}
              type={item.res_type}
              price={item.price}
              fooddetail_id={item.id}
              isFavorite={true} // Always true for items in the favourites list
              favouriteId={item.favouriteId} // ID of the favorite item
              onToggleFavorite={handleToggleFavorite} // Callback to refresh the list
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
