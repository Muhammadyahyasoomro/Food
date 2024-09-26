import React, { createContext, useState, useContext } from "react";
import { useHealth } from "./HealthContext";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { isHealthyMode } = useHealth();
  const [filterType, setFilterType] = useState(false);
  const [rating, setRating] = useState(0);
  const [chefRating, setChefRating] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [foodData, setFoodData] = useState([]);
  const userDiseases = localStorage.getItem("disease");
  const ResetFilter = () => {
    setFoodData([]);
  };
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
        console.log("food data");
        console.log(data);

        if (isHealthyMode === true && userDiseases) {
          const userDiseasesArray = userDiseases.split(","); // Split user diseases into an array

          // Filter the data based on diseases matching
          const filteredData = data.filter((row) => {
            const rowDiseasesArray = row.disease.split(","); // Split row diseases into an array

            // Check if all user diseases are in the row diseases
            return userDiseasesArray.every((disease) =>
              rowDiseasesArray.includes(disease.trim())
            );
          });

          setFoodData(filteredData); // Set filtered data
        } else {
          setFoodData(data); // Set unfiltered data if not in healthy mode
        }
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
        setChefRating,
        chefRating,
        setMin,
        setMax,
        ResetFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
