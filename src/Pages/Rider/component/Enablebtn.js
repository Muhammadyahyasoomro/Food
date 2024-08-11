import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Enablebtn = ({ riderId }) => {
  const navigate = useNavigate();

  const handleActivateStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost/webapplication2/api/Rider/updateRiderStatus?rider_id=${riderId}&rider_status=active`,
        { method: "POST" }
      );

      if (response.ok) {
        navigate(`/BigRides`);
      } else {
        console.error("Failed to activate status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50, marginBottom: 10 }}>
      <Button className="btn btn-danger" onClick={handleActivateStatus}>
        Enable Active Status
      </Button>
    </div>
  );
};
