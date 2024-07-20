// CategoryContext.js

import React, { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);

  return (
    <CategoryContext.Provider value={{ category, setCategory, subcategory, setSubcategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
