import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterType, setFilterType] = useState("");
  const [rating, setRating] = useState(0.0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [foodData, setFoodData] = useState([]);

  const ApplyFilter = () => {
    setFoodData([]);
    fetch(
      `http://localhost/webapplication2/api/customer/GetFilteredFoodItems?resType=${filterType}&minPrice=${min}&maxPrice=${max}&minRating=${rating}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(`food data`);
        console.log(data);
        setFoodData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <FilterContext.Provider
      value={{
        ApplyFilter,
        foodData,
        min,
        max,
        filterType,
        rating,
        setFilterType,
        setRating,
        setMin,
        setMax,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
