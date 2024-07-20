import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

export default function TopRestaurant({ dataset, status }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (status) {
      // Use the dataset if status is true
      setRestaurants([dataset]);
      console.log("Dataset:", dataset);
    } else {
      // Fetch data if status is false
      fetch(
        "http://localhost/fooddeliverysystems/api/customer/GetRestaurants",
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
  }, [dataset, status]); // Re-run effect when dataset or status changes

  return (
    <div>
      {restaurants.map((item, index) => (
        <RestaurantCard
          key={index} // Added key prop
          ResName={item.restaurantname || item.name} // Adjust property based on data source
          ResId={item.restaurantID || item.id}
          rating={item.res_rating}
          type={item.type}
          isSpecial={status}
        />
      ))}
      {restaurants.map((item) => console.log(item))} {/* Log for debugging */}
    </div>
  );
}
