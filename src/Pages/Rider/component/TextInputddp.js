import React, { useState } from "react";
import "../WorkingAreas.css";

export default function TextInputddp() {
  const [selectedZone, setSelectedZone] = useState("");

  const handleInputChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedZone(event.target.value);
  };

  return (
    <>
      <div
        className="ddworkingArea"
        style={{
          display: "flex",
          justifyContent: "center",
          letterSpacing: "2px",
          wordSpacing: "2px",
        }}
      >
        <label style={{ fontSize: ".9rem", fontWeight: "inherit" }}>
          Select working zone
        </label>
        <div className="Custom-Zone">
          <input
            type="text"
            className="inputZone"
            value={selectedZone}
            onChange={handleInputChange}
          />
          <select
            className="selectZone"
            value={""}
            onChange={handleSelectChange}
          >
            <option value=""></option>
            <option value="zone A">zone A</option>
            <option value="zone B">zone B</option>
            <option value="zone C">zone C</option>
          </select>
          <button className="btnAdd">+</button>
        </div>
      </div>
    </>
  );
}
