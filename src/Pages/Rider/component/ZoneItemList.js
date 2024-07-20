import React from "react";

export default function ZoneItemList() {
  return (
    <div>
      <div
        className="ZoneItems"
        style={{
          justifyContent: "center",
          marginLeft: "6%",
          border: "1px solid red", // Remove space between "1" and "px"
          display: "flex",
          alignItems: "center", // Vertically center items
          gap: "20px", // Change "20rem" to "20px" for a smaller gap
          maxWidth: "88%", // Ensure the div doesn't overflow its container
          padding: "10px", // Add padding for better spacing
          boxSizing: "border-box", // Include padding in width calculations
        }}
      >
        <h6 style={{ flex: "1", margin: "0" }}>
          commerical area plaza 6th road rwp
        </h6>
        <img
          src={require("../../../Components/assets/rider/map.png")}
          width={20}
          height={20}
          style={{ flex: "0 0 auto" }} // Prevent image from shrinking or growing
          alt="Map Icon"
        />
      </div>
    </div>
  );
}
