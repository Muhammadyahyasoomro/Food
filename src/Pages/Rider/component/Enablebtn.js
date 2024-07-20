import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Enablebtn = ({ riderId }) => {
  const [btnText, setBtnText] = useState("Enable Active Status");
  const [status, setStatus] = useState("inactive");
  const Navigate = useNavigate();
  const handleUpdateStatus = async () => {
    const newStatus = status === "inactive" ? "active" : "inactive";

    try {
      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/Rider/updateRiderStatus?rider_id=${riderId}&rider_status=${newStatus}`,
        { method: "POST" }
      );

      if (response.ok) {
        setStatus(newStatus);
        if (newStatus == "active") {
          Navigate(`/BigRides`);
        }
        setBtnText(
          newStatus === "inactive"
            ? "Enable Active Status"
            : "Disable Active Status"
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost/FoodDeliverySystems/api/Rider/CheckStatus?riderId=${riderId}`
        );

        if (response.ok) {
          const data = await response.json();
          const currentStatus = data.status;
          setStatus(currentStatus);

          setBtnText(
            currentStatus === "inactive"
              ? "Enable Active Status"
              : "Disable Active Status"
          );
        } else {
          console.error("Failed to fetch status");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkStatus();
  }, [riderId]);

  return (
    <div style={{ textAlign: "center", marginTop: 50, marginBottom: 10 }}>
      <Button className="btn btn-danger" onClick={handleUpdateStatus}>
        {btnText}
      </Button>
    </div>
  );
};
