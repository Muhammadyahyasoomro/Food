import React from "react";
import EarningAttribute from "./EarningAttribute";
import "./Earned.css";

export default function Earnings(props) {
  return (
    <>
      <div className="EarningRow">
        <h5 style={{ textAlign: "center", color: "white" }}>{props.heading}</h5>

        <div
          style={{
            backgroundColor: "red",
            flexDirection: "row",
            padding: 10,
            margin: 10,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <EarningAttribute
            attributeHeader="Rides"
            attributeValue={props.data.Rides}
            className="RowAttribute"
          />
          <EarningAttribute
            attributeHeader="Earning"
            attributeValue={props.data.Earning}
          />
          <EarningAttribute
            attributeHeader="Rating"
            attributeValue={props.data.Rating}
          />
          {props.data.TimeLeft && (
            <EarningAttribute
              attributeHeader="DaysLeft"
              attributeValue={props.data.TimeLeft}
            />
          )}
        </div>
      </div>
    </>
  );
}
