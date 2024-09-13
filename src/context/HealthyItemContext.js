import React, { createContext, useState, useContext } from "react";
import { useHealth } from "./HealthContext";
const HealthyItemContext = createContext();

export const HealthyItemsProvider = ({ children }) => {
  const [isHealthyItemsMode, setIsHealthyItemsMode] = useState(true);
  const [Healthyfooditems, setHealthyFoodItems] = useState();

  const toggleHealthyItems = () => {
    setIsHealthyItemsMode((prevMode) => !prevMode);
  };
  const MakeStatusFalseForHealthyItems = () => {
    setIsHealthyItemsMode(() => false);
  };

  return (
    <HealthyItemContext.Provider
      value={{
        MakeStatusFalseForHealthyItems,
        toggleHealthyItems,
        isHealthyItemsMode,
        setIsHealthyItemsMode,
        Healthyfooditems,
        setHealthyFoodItems,
      }}
    >
      {children}
    </HealthyItemContext.Provider>
  );
};

export const useHealthyItems = () => useContext(HealthyItemContext);
