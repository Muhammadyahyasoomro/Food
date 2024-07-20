import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import Select from "react-select";
import axios from "axios";
import { Navbar } from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

const APIHandler = {
  getDistinctAreaNames: async () => {
    const response = await axios.get(
      `http://localhost/FoodDeliverySystems/api/rider/GetDistinctAreaNames`
    );
    return response.data;
  },
  getZoneDetails: async (areaName) => {
    const response = await axios.get(
      `http://localhost/FoodDeliverySystems/api/rider/GetZoneDetails?areaName=${areaName}`
    );
    return response.data;
  },
  updateRiderLocation: async (riderId, latitude, longitude) => {
    await axios.post(
      `http://localhost/FoodDeliverySystems/api/rider/UpdateRiderLocation?id=${localStorage.getItem(
        "riderId"
      )}&latitude=${latitude}&longitude=${longitude}`
    );
  },
  insertZoneBaseServing: async (zoneId, riderId) => {
    await axios.post(
      `http://localhost/FoodDeliverySystems/api/rider/InsertZoneBaseServing?zoneId=${zoneId}&riderId=${localStorage.getItem(
        "riderId"
      )}`
    );
  },
};

const WorkingZonePage = ({ riderId }) => {
  const [center, setCenter] = useState(null);
  const [latInfo, setLatInfo] = useState("");
  const [longInfo, setLongInfo] = useState("");
  const [zones, setZones] = useState([]);
  const [zoneIds, setZoneIds] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDUzYaiX303nr6XqMvtl8OEgFYIKc2scgI",
    libraries: ["places"],
  });

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const fetchedZones = await APIHandler.getDistinctAreaNames();
        setZones(fetchedZones);
      } catch (e) {
        console.error("Failed to load zones:", e);
      }
    };

    const determinePosition = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setCenter({ lat, lng });
            setLatInfo(`Latitude: ${lat}`);
            setLongInfo(`Longitude: ${lng}`);
            setMarkers([{ lat, lng, info: "Current Location" }]);
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

    fetchZones();
    determinePosition();
  }, []);

  const fetchZoneDetailsAndDrawPolygon = async (areaName) => {
    try {
      const fetchedZoneCoordinates = await APIHandler.getZoneDetails(areaName);
      if (fetchedZoneCoordinates.length > 0) {
        const newMarkers = fetchedZoneCoordinates.map((coordinate) => ({
          lat: coordinate.latitude,
          lng: coordinate.longitude,
          id: coordinate.id,
        }));
        setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
        drawPolygon(areaName, fetchedZoneCoordinates);
        setZoneIds((prevZoneIds) => [
          ...prevZoneIds,
          ...fetchedZoneCoordinates.map((coord) => coord.id),
        ]);
      }
    } catch (e) {
      console.error("Failed to load zone coordinates:", e);
    }
  };

  const drawPolygon = (areaName, coordinates) => {
    const polygonPath = coordinates.map((coordinate) => ({
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    }));
    setPolygons((prevPolygons) => [
      ...prevPolygons,
      {
        path: polygonPath,
        id: `zone_polygon_${areaName}`,
      },
    ]);
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      polygonPath.forEach((point) => bounds.extend(point));
      mapRef.current.fitBounds(bounds);
    }
  };

  const handleZoneChange = (selectedOptions) => {
    const selectedZoneNames = selectedOptions.map((option) => option.value);
    setSelectedZones(selectedZoneNames);
    setZoneIds([]);
    setPolygons([]);
    selectedZoneNames.forEach((zone) => fetchZoneDetailsAndDrawPolygon(zone));
  };

  const handleAddButtonClick = async () => {
    try {
      if (center) {
        await APIHandler.updateRiderLocation(riderId, center.lat, center.lng);
        for (const id of zoneIds) {
          await APIHandler.insertZoneBaseServing(id, riderId);
        }
        alert("Operation successful");
        Navigate("/myrides");
        // Implement navigation to login page if needed
      } else {
        alert("Center location is not set.");
      }
    } catch (e) {
      console.error("Failed to perform operation:", e);
      alert(`Failed to perform operation: ${e}`);
    }
  };
  const Navigate = useNavigate();
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Navbar className="m-4" />
      <div style={{ marginTop: "5rem" }}></div>
      <div className="working-zone-page">
        <h1 className="title fs-3 align-items-center text-center">
          Working Areas
        </h1>
        <div
          className="select-container border border-3  border-danger rounded container"
          style={{ marginLeft: "9rem", marginBottom: "1rem" }}
        >
          <Select
            options={zones.map((zone) => ({ value: zone, label: zone }))}
            isMulti
            onChange={handleZoneChange}
          />
        </div>
        <div
          className=" border border-3 rounded border-danger  container  "
          style={{ marginLeft: "9rem" }}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={center}
            zoom={15}
            onLoad={(map) => (mapRef.current = map)}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            ))}
            {polygons.map((polygon, index) => (
              <Polygon
                key={index}
                path={polygon.path}
                options={{
                  strokeColor: "blue",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "blue",
                  fillOpacity: 0.35,
                }}
              />
            ))}
          </GoogleMap>
        </div>
        <div
          className="info-container  container"
          style={{ marginLeft: "35rem" }}
        >
          <h2>Current Location</h2>
          <p>{latInfo}</p>
          <p>{longInfo}</p>
        </div>
        <button
          className="add-button bg-danger text-white fs-4  border border-0 rounded p-3"
          style={{ marginLeft: "35rem", marginBottom: "2rem" }}
          onClick={handleAddButtonClick}
        >
          Add Your Working Zones
        </button>
      </div>
    </>
  );
};

export default WorkingZonePage;
