import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

// Default properties
const defaultProps = {
  zoom: 4,
  defaultLocation: { lat: -25.363, lng: 131.044 }, // Uluru, Australia as a default
};

// Marker component
const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "5px 10px",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    }}
  >
    {text}
  </div>
);

export default function GoogleMap() {
  const [mapCenter, setMapCenter] = useState(defaultProps.defaultLocation);
  const [markerPosition, setMarkerPosition] = useState(
    defaultProps.defaultLocation
  );

  useEffect(() => {
    // Function to get the current latitude and longitude
    const getLatLong = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMapCenter({ lat: latitude, lng: longitude });
            setMarkerPosition({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location", error);
            // Use default location if unable to get user's location
          }
        );
      } else {
        // Geolocation not supported
        alert("Geolocation is not supported by this browser.");
      }
    };

    // Call the function to get the current position on component load
    getLatLong();
  }, []);

  // Handle map click to set marker position
  const handleMapClick = ({ lat, lng }) => {
    setMarkerPosition({ lat, lng });
  };

  return (
    <div
      className="GoogleMap"
      style={{
        border: "1px solid black",
        margin: "5px",
        height: "400px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDUzYaiX303nr6XqMvtl8OEgFYIKc2scgI" }}
        defaultCenter={defaultProps.defaultLocation} // Set initial center to default
        center={mapCenter} // Center map at user's location initially
        defaultZoom={defaultProps.zoom}
        onClick={handleMapClick} // Set marker position on map click
      >
        <Marker lat={markerPosition.lat} lng={markerPosition.lng} text="?" />
      </GoogleMapReact>
    </div>
  );
}
