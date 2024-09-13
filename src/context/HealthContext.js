import React, { createContext, useState, useContext } from "react";
import { useHealthyItems } from "./HealthyItemContext";
const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [isHealthyMode, setIsHealthyMode] = useState(true);
  const [fooditems, setFoodItems] = useState();
  const { MakeStatusFalseForHealthyItems } = useHealthyItems();

  const toggleHealth = () => {
    setIsHealthyMode((prevMode) => !prevMode);
    if (isHealthyMode) {
      MakeStatusFalseForHealthyItems();
    }
  };
  const MakeStatusNullForHealthyContext = () => {
    setIsHealthyMode(() => false);
  };

  return (
    <HealthContext.Provider
      value={{
        MakeStatusNullForHealthyContext,
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
