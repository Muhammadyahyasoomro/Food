import React from "react";
import "./Earned.css";
export default function EarningAttribute(props) {
  return (
    <div
      className="Rides"
      style={{
        backgroundColor: "#13DA84",
        width: "9rem",
        borderRadius: 5,
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <h6 style={{ color: "white" }}>{props.attributeHeader}</h6>
      <div
        style={{ backgroundColor: "white", border: "none", borderRadius: 5 }}
      >
        <h6>{props.attributeValue}</h6>
      </div>
    </div>
  );
}
