// ThemeContext.js

import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [next,setnext]=useState(0);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const  CheckNext=()=>{
    setnext((prev)=>(prev+1));  
    next>2&&setnext(0)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme ,next,CheckNext}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
