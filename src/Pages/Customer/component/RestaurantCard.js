import React, { useEffect, useState } from "react";
import { House, Shop } from "react-bootstrap-icons";
import { FoodCard } from "../component/FoodCard";
import { useNavigate } from "react-router-dom";
import alternativeImage from "../../../Components/assets/alternativeImage.png";
import { useTheme } from "../../../context/ThemeContext";
import { useHealth } from "../../../context/HealthContext";
import { useHealthyItems } from "../../../context/HealthyItemContext";
export default function RestaurantCard({ ResName, ResId, rating, type }) {
  const { isHealthyMode } = useHealth();
  const { isHealthyItemsMode } = useHealthyItems();
  const { theme } = useTheme();
  const [ItemList, setItemList] = useState([]);
  const Navigate = useNavigate();

  const API_BASE_URL = `http://localhost/WebApplication2/api`;

  useEffect(() => {
    // Fetch Restaurant Items
    fetch(`${API_BASE_URL}/Customer/DefaultFooditems?restaurantId=${ResId}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Restaurant Items:", data);
        setItemList(data);
        console.log("isheahlyitemslist", data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant items:", error);
      });
  }, [ResId]);

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  const filterItemsByDisease = (item) => {
    const itemDiseases = item.DiseaseName.split(",").map((disease) =>
      disease.trim()
    );
    const userDiseases = localStorage
      .getItem("disease")
      .split(",")
      .map((disease) => disease.trim());

    return userDiseases.some((userDisease) =>
      itemDiseases.includes(userDisease)
    );
  };

  return (
    <div>
      <div
        style={{ backgroundColor: theme === "light" ? "#9c032c" : "#520218" }}
        className="p-3 text-white fs-3 text-uppercase text-center"
      >
        {ResName}
      </div>
      <div
        onClick={() => {
          Navigate("/Restaurant", { state: { id: ResId, name: ResName } });
        }}
        className="text-white text-center"
        style={{
          backgroundColor: theme === "light" ? "#9c032c" : "#520218",
          WebkitLineBreak: "loose",
        }}
      >
        {type ? (
          <House style={{ width: "5rem", height: "3rem" }} />
        ) : (
          <Shop style={{ width: "5rem", height: "3rem" }} />
        )}
      </div>
      <div className="text-center fs-2 m-2">{renderStars(rating)}</div>
      <div
        className="d-flex flex-nowrap overflow-auto"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <div className="d-flex">
          {isHealthyItemsMode &&
            ItemList.filter((row) => row.IsHealthy == true).map((Item) => (
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
                  // rating={Item.foodRating}
                  rating={Math.floor(Math.random() * 4 + 1)}
                  title={Item.name}
                  type={Item.res_type}
                  price={Item.min_price}
                  fooddetail_id={Item.id}
                  isHealthyItem={true}
                  restaurantname={Item.restaurantname}
                />
              </div>
            ))}
          {isHealthyMode
            ? ItemList.filter(filterItemsByDisease).map((Item) => (
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
                    // rating={Item.foodRating}
                    rating={Math.floor(Math.random() * 4 + 1)}
                    title={Item.name}
                    type={Item.res_type}
                    price={Item.min_price}
                    fooddetail_id={Item.id}
                    isHealthy={true}
                    restaurantname={Item.restaurantname}
                    DiseaseName={Item.DiseaseName}
                  />
                </div>
              ))
            : !isHealthyItemsMode &&
              ItemList.map((Item) => (
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
                    // rating={Item.foodRating}
                    rating={Math.floor(Math.random() * 4 + 1)}
                    title={Item.name}
                    type={Item.res_type}
                    price={Item.min_price}
                    fooddetail_id={Item.id}
                    restaurantname={Item.restaurantname}
                    isHealthy={false}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
