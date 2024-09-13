// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "../src/context/ThemeContext";
import { CategoryProvider } from "./context/CategoryContext";
import { SearchProvider } from "./context/SearchContext";
import reportWebVitals from "./reportWebVitals";
import { FilterProvider } from "./context/FilterContext";
import { HealthProvider } from "./context/HealthContext";
import { HealthyItemsProvider } from "./context/HealthyItemContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HealthyItemsProvider>
      {" "}
      <HealthProvider>
        <ThemeProvider>
          <CategoryProvider>
            <SearchProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </SearchProvider>
          </CategoryProvider>
        </ThemeProvider>
      </HealthProvider>
    </HealthyItemsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
