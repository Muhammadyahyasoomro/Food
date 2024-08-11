import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, Circle, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { Navbar } from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

const APIHandler = {
  updateRiderLocation: async (riderId, latitude, longitude,radius) => {
    await axios.post(
      `http://localhost/webapplication2/api/rider/UpdateRiderLocation?id=${localStorage.getItem("riderId")}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    );
  },
};

const WorkingZonePage = ({ riderId }) => {
  const [center, setCenter] = useState(null);
  const [radius, setRadius] = useState(0.1); // Default radius to 2 km
  const [latInfo, setLatInfo] = useState("");
  const [longInfo, setLongInfo] = useState("");
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDUzYaiX303nr6XqMvtl8OEgFYIKc2scgI", // Replace with your actual API key
    libraries: ["places"],
  });

  useEffect(() => {
    const determinePosition = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setCenter({ lat, lng });
            setLatInfo(`Latitude: ${lat}`);
            setLongInfo(`Longitude: ${lng}`);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLatInfo("Location services are disabled.");
            setLongInfo("");
          }
        );
      } else {
        setLatInfo("Geolocation is not supported by this browser.");
        setLongInfo("");
      }
    };

    determinePosition();
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCenter({ lat, lng });
    setLatInfo(`Latitude: ${lat}`);
    setLongInfo(`Longitude: ${lng}`);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleAddButtonClick = async () => {
    try {
      if (center) {
        await APIHandler.updateRiderLocation(riderId, center.lat, center.lng,radius);
        alert("Location updated successfully");
        Navigate("/myrides");
      } else {
        alert("Please select a location on the map.");
      }
    } catch (e) {
      console.error("Failed to update location:", e);
      alert(`Failed to update location: ${e}`);
    }
  };

  const Navigate = useNavigate();
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Navbar className="m-4" />
      <div style={{ marginTop: "5rem" }}></div>
      <div className="working-zone-page">
        <h1 className="title fs-3 align-items-center text-center">Working Areas</h1>
        <div className="border border-3 rounded border-danger container" style={{ marginLeft: "9rem" }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={center}
            zoom={15}
            onClick={handleMapClick}
            onLoad={(map) => (mapRef.current = map)}
          >
            {center && (
              <>
                <Marker position={center} />
                <Circle
                  center={center}
                  radius={radius * 1000} // Convert km to meters
                  options={{
                    strokeColor: "red",
                    strokeOpacity: 0.9,
                    strokeWeight: 2,
                    fillColor: "red",
                    fillOpacity: 0.35,
                  }}
                />
              </>
            )}
          </GoogleMap>
        </div>
        <div className="info-container container" style={{ marginLeft: "35rem" }}>
          <h2>Current Location</h2>
          <p>{latInfo}</p>
          <p>{longInfo}</p>
          <div className="radius-input">
            <label htmlFor="radius">Delivery Radius (km): </label>
            <input
              type="number"
              id="radius"
              value={radius}
              onChange={handleRadiusChange}
              min="1"
              max="50"
              style={{ width: "60px", marginLeft: "10px" }}
            />
          </div>
        </div>
        <button
          className="add-button bg-danger text-white fs-4 border border-0 rounded p-3"
          style={{ marginLeft: "35rem", marginBottom: "2rem" }}
          onClick={handleAddButtonClick}
        >
          Update Working Location
        </button>
      </div>
    </>
  );
};

export default WorkingZonePage;
