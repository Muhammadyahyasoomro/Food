import React, { createContext, useState, useContext } from "react";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [isHealthyMode, setIsHealthyMode] = useState(true);
  const [fooditems, setFoodItems] = useState();

  const toggleHealth = () => {
    setIsHealthyMode((prevMode) => !prevMode);
  };

  return (
    <HealthContext.Provider
      value={{
        toggleHealth,
        isHealthyMode,
        setIsHealthyMode,
        fooditems,
        setFoodItems,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
