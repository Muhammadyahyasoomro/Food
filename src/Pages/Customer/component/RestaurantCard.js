import React, { useEffect, useState } from "react";
import { House, Shop } from "react-bootstrap-icons";
import { FoodCard } from "../component/FoodCard";
import { useNavigate } from "react-router-dom";
import alternativeImage from "../../../Components/assets/alternativeImage.png";

export default function RestaurantCard({
  ResName,
  ResId,
  rating,
  type,
  
}) {
  const [ItemList, setItemList] = useState([]);
  const [SpecialItemList, setSpecialItemList] = useState([]);
  const Navigate = useNavigate();
  
  const API_BASE_URL = `http://localhost/WebApplication2/api`;

  useEffect(() => {
    // Fetch Special Items
 
    // Fetch Restaurant Items
    fetch(
      `${API_BASE_URL}/Customer/GetSpecificRestaurantItemsByTopRating?restaurantId=${ResId}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Restaurant Items:", data);
        setItemList(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant items:", error);
      });
  }, [ResId]);

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div>
      <div className="bg-danger p-3 text-white fs-3 text-uppercase text-center">
        {ResName}
      </div>
      <div
        onClick={() => {
          Navigate("/Restaurant", { state: { id: ResId, name: ResName } });
        }}
        className="bg-danger text-white text-center "
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
            {SpecialItemList.map((Item) => (
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
                  fooddetail_id={Item.id}
                />
              </div>
            ))}
          </div>
        
          <div className="d-flex">
            {ItemList.map((Item) => (
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
                  price={Item.price}
                  fooddetail_id={Item.id}
                />
              </div>
            ))}
          </div>
        
      </div>
    </div>
  );
}
