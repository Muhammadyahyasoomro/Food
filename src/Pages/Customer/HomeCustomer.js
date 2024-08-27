import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarCustomer from "./component/NavbarCustomer";
import { FoodCard } from "./component/FoodCard";
import TapRated from "./component/TapRated";
import TopRestaurant from "./component/TopRestaurant";
import { CustomerFooter } from "./component/CustomerFooter";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import alternativeImage from "../../../src/Components/assets/alternativeImage.png";
import { useFilter } from "../../context/FilterContext";
import { useHealth } from "../../context/HealthContext";

export default function HomeCustomer() {
  const { isHealthyMode } = useHealth();
  const { foodData, rating } = useFilter();
  const API_BASE_URL = `http://localhost/WebApplication2/api`;
  const { search, setSearch } = useSearch("null");
  const [searchedItems, setSearchedItems] = useState([]);

  const navigate = useNavigate();
  console.log("rating", rating);
  useEffect(() => {
    if (localStorage.getItem("emailCustomer") == null) {
      navigate("/");
    }
  }, [navigate]);

  const renderFoodCards = (foodlist) => (
    <Row xs={2} md={4} lg={6} className="g-3">
      {rating > 0
        ? foodlist
            .filter((item) => item.foodRating >= rating - 1)
            .map(
              (item, index) => (
                console.log("item", item),
                (
                  <Col key={index}>
                    <FoodCard
                      imageUrl={`http://localhost/webapplication2/Content/FoodItems/${item.f_image}`}
                      rating={item.foodRating}
                      title={item.name}
                      type={item.res_type}
                      price={item.Price}
                      bid={item.id}
                      restaurantname={item.RestName}
                    />
                    {item.res_type}
                  </Col>
                )
              )
            )
        : foodlist.map((item, index) => (
            <Col key={index}>
              <FoodCard
                imageUrl={`http://localhost/webapplication2/Content/FoodItems/${item.f_image}`}
                rating={item.foodRating}
                title={item.name}
                type={item.res_type}
                price={item.Price}
                bid={item.id}
                restaurantname={item.RestName}
              />
            </Col>
          ))}
    </Row>
  );

  const searchFunction = async () => {
    try {
      const response = await fetch(
        `http://localhost/WebApplication2/api/Customer/SearchFood?SearchedValue=${search}`
      );
      const json = await response.json();
      setSearchedItems(json);

      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  useEffect(() => {
    searchFunction();
  }, [search]);

  return (
    <>
      <NavbarCustomer onSearch={setSearch} />
      <div className="mx-4">
        {foodData.length > 0 && foodData && renderFoodCards(foodData)}
        {searchedItems.length > 0 && search ? (
          <>
            {search}
            <div className="d-flex">
              {searchedItems.map((Item) => (
                <div className="my-4 mx-2" key={Item.id}>
                  <FoodCard
                    className="mx-5"
                    style={{
                      maxWidth: "13rem",
                      maxHeight: "25rem",
                    }}
                    imageUrl={
                      Item.f_image
                        ? `http://localhost/WebApplication2/Content/FoodItems/${Item.f_image}`
                        : alternativeImage
                    }
                    rating={Item.foodRating}
                    title={Item.name}
                    type={Item.res_type}
                    price={Item.min_price}
                    fooddetail_id={Item.id}
                  />
                </div>
              ))}
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <TopRestaurant />
          </>
        )}

        <CustomerFooter />
      </div>
    </>
  );
}
