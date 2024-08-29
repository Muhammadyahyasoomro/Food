import React from "react";
import "./Earned.css";
import { useTheme } from "@emotion/react";
export default function EarningAttribute(props) {
  const { theme } = useTheme();
  return (
    <div
      className="Rides"
      style={{
        backgroundColor: theme === "light" ? "grey" : "grey",
        width: "9rem",
        borderRadius: 5,
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <h6 style={{ color: "white" }}>{props.attributeHeader}</h6>
      <div
        style={{ backgroundColor: "black", border: "none", borderRadius: 5 }}
      >
        <h6 style={{ color: theme === "light" ? "black" : "white" }}>
          {props.attributeValue}
        </h6>
      </div>
    </div>
  );
}
