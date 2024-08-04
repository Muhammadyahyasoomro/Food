// ThemeContext.js

import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterType,setFilterType]=useState();
  const [rating,setRating]=useState();
  const [min,setMin]=useState();
  const [max,setMax]=useState();

 
 const ApplyFilter=()=>{
    // console.log("filteredApplied");
    // http://localhost/WebApplication2/api/Customer/GetFilteredFoodItems?resType=true&minPrice=0&maxPrice=200&minRating=3
 }

  return (
    <FilterContext.Provider value={{filterType,setFilterType,rating,setRating,min,setMin,max,setMax}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
