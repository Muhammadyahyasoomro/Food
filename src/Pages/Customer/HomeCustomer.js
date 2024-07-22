import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarCustomer from "./component/NavbarCustomer";
import { FoodCard } from "./component/FoodCard";
import TapRated from "./component/TapRated";
import TopRestaurant from "./component/TopRestaurant";
import { CustomerFooter } from "./component/CustomerFooter";
import { useNavigate } from "react-router-dom";

export default function HomeCustomer() {
  const API_BASE_URL = `http://localhost/WebApplication2/api`;
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [orderForAnotherPerson, setOrderForAnotherPerson] = useState(true);
  const [specialRestaurants, setSpecialRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("emailCustomer") == null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSpecialRestaurants = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/Customer/SpecialRestaurantsForCustomer?customer_id=${localStorage.getItem(
            "c_id"
          )}&DiseaseName=${localStorage.getItem("disease")}`
        );
        const data = await response.json();
        setSpecialRestaurants(data);
        console.log("Special restaurants", data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchSpecialRestaurants();
  }, []);

  const filterSearch = async (value) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/customer/SearchbyRestaurantOrFoodItem?SearchedValue=${value}`
      );
      const data = await response.json();
      setSearchedItems(data.length > 0 ? data : []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const applyFilters = async (filters) => {
    try {
      const params = new URLSearchParams();

      if (filters.priceMin) params.append("minPrice", filters.priceMin);
      if (filters.priceMax) params.append("maxPrice", filters.priceMax);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.res_type !== null)
        params.append("res_type", filters.res_type);

      const response = await fetch(
        `${API_BASE_URL}/customer/filterfooditems?${params.toString()}`
      );

      const data = await response.json();
      setFilteredItems(data.length > 0 ? data : []);
    } catch (error) {
      console.error("Error fetching filtered results:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchedValue(value);
    filterSearch(value);
  };

  const renderFoodCards = (items) => (
    <Row xs={1} md={2} lg={4} className="g-3">
      {items.map((item, index) => (
        <Col key={index}>
          <FoodCard
            imageUrl={`http://webapplication2/Content/FoodItem/${item.f_image}`}
            rating={item.foodRating}
            title={item.name}
            type={item.res_type}
            price={item.price}
            bid={item.id}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <NavbarCustomer onSearch={handleSearch} onApplyFilters={applyFilters} />
      <div className="mx-4">
        <button
          className="bg-success text-white fs-4 border border-0 rounded p-2"
          onClick={() => {
            setOrderForAnotherPerson(false);
            localStorage.setItem("FoodStatus", 1);
          }}
        >
          Order For Another Person
        </button>
        {orderForAnotherPerson ? (
          <TopRestaurant dataset={specialRestaurants} status={true} />
        ) : searchedValue ? (
          renderFoodCards(searchedItems)
        ) : filteredItems.length > 0 ? (
          renderFoodCards(filteredItems)
        ) : (
          <>
            <TapRated />
            <TopRestaurant />
          </>
        )}
        <CustomerFooter />
      </div>
    </>
  );
}
