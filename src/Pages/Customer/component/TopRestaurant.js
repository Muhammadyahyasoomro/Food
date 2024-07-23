import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

export default function TopRestaurant({ dataset, status }) {
  const [restaurants, setRestaurants] = useState([]);
  const API_BASE_URL = `http://localhost/WebApplication2/api`;
  useEffect(() => {
    if (status) {
      // Use the dataset if status is true
      setRestaurants([dataset]);
      console.log("Dataset:", dataset);
    } else {
      // Fetch data if status is false
      fetch(
        `${API_BASE_URL}/customer/GetRestaurants`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setRestaurants(data);
        })
        .catch((error) => {
          console.error(
            "There was a problems with the fetch operation:",
            error
          );
        });
    }
  }, []); 

  return (
    <div>
      {restaurants.map((item, index) => (
        <RestaurantCard
          key={index} // Added key prop
          ResName={item.restaurantname || item.name} // Adjust property based on data source
          ResId={item.restaurantID || item.id}
          rating={item.res_rating}
          type={item.type}
         
        />
      ))}
      {restaurants.map((item) => console.log(item))} {/* Log for debugging */}
    </div>
  );
}
