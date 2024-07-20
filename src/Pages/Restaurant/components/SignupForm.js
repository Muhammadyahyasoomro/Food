import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    res_name: "",
    res_email: "",
    res_password: "",
    res_phone: "",
    res_address: "",
    res_image: null,
    isHomechef: false,
  });
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user's current position
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    }
  }, []);

  // Fetch area name using Google Maps API
  const fetchAreaName = async (latitude, longitude) => {
    const apiKey = "AIzaSyDUzYaiX303nr6XqMvtl8OEgFYIKc2scgI";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const area = data.results[0].address_components.find(
        (component) =>
          component.types.includes("sublocality") ||
          component.types.includes("locality")
      );
      return area ? area.long_name : "DefaultArea";
    }
    return "DefaultArea";
  };

  // Create a polygon around a point
  const createPolygon = (latitude, longitude, radius = 5) => {
    const EARTH_RADIUS = 6371; // Earth's radius in km
    const d = radius / EARTH_RADIUS; // angular distance in radians
    const coordinates = [];

    for (let i = 0; i < 360; i += 72) {
      // 72 degrees step for 5 points
      const bearing = i * (Math.PI / 180); // convert degrees to radians
      const latRadians = latitude * (Math.PI / 180); // convert latitude to radians
      const lonRadians = longitude * (Math.PI / 180); // convert longitude to radians

      const newLat = Math.asin(
        Math.sin(latRadians) * Math.cos(d) +
          Math.cos(latRadians) * Math.sin(d) * Math.cos(bearing)
      );
      const newLon =
        lonRadians +
        Math.atan2(
          Math.sin(bearing) * Math.sin(d) * Math.cos(latRadians),
          Math.cos(d) - Math.sin(latRadians) * Math.sin(newLat)
        );

      coordinates.push({
        latitude: newLat * (180 / Math.PI), // convert back to degrees
        longitude: newLon * (180 / Math.PI), // convert back to degrees
      });
    }

    return coordinates;
  };

  const onCreateRestaurant = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", restaurant.res_name);
    formData.append("email", restaurant.res_email);
    formData.append("password", restaurant.res_password);
    formData.append("address", restaurant.res_address);
    formData.append("phone", restaurant.res_phone);
    formData.append("res_type", restaurant.isHomechef ? "True" : "False");

    if (restaurant.res_image) {
      formData.append("bannerImage", restaurant.res_image);
    }

    if (lat !== null && lon !== null) {
      formData.append("latitude", lat);
      formData.append("longitude", lon);
    }

    try {
      const response = await fetch(
        `http://localhost/WebApplication2/api/restaurant/signup`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Signup response:", data);

      const latestRestaurant = await fetchLatestRestaurant(lat, lon);

      const polygonExists = await checkIfInPolygon(lat, lon);

      const areaName = await fetchAreaName(lat, lon);

      if (polygonExists) {
        await updateRestaurantZones(lat, lon, latestRestaurant.id, areaName);
      } else {
        const workingZone = createPolygon(lat, lon, 5); // Create a 5 km radius polygon
        await updateRestaurantZones(
          lat,
          lon,
          latestRestaurant.id,
          areaName,
          workingZone
        );
      }

      navigate("/LoginRestaurant");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestRestaurant = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/Restaurant/GetLatestRestaurant?lat=${latitude}&lon=${longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Latest restaurant data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching latest restaurant:", error);
    }
  };

  const checkIfInPolygon = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/restaurant/CheckForPolygon?latitude=${latitude}&longitude=${longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        // Assuming 404 means no polygon found
        return false;
      }

      const data = await response.json();
      console.log("Polygon check data:", data);
      return data.length > 0;
    } catch (error) {
      console.error("Error checking polygon:", error);
      return false;
    }
  };

  const updateRestaurantZones = async (
    latitude,
    longitude,
    restaurantId,
    areaName,
    workingZone = null
  ) => {
    try {
      if (!workingZone) {
        workingZone = createPolygon(latitude, longitude, 5);
      }

      const formData = new FormData();
      formData.append("workingZone", JSON.stringify(workingZone));
      formData.append("restaurant_id", restaurantId);
      formData.append("areaname", areaName);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      const response = await fetch(
        `http://localhost/FoodDeliverySystems/api/Restaurant/UpdateRestaurantZones`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Update zones response:", data);
    } catch (error) {
      console.error("Error updating zones:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setRestaurant((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-md-6">
          <div
            className="mt-5 bg-danger p-2"
            style={{ marginTop: 100, textAlign: "center" }}
          >
            <form onSubmit={onCreateRestaurant}>
              <div className="form-group">
                <input
                  className="form-control m-1"
                  type="text"
                  name="res_name"
                  placeholder="Restaurant Name"
                  value={restaurant.res_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control m-1"
                  type="email"
                  name="res_email"
                  placeholder="Email"
                  value={restaurant.res_email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control m-1"
                  type="password"
                  name="res_password"
                  placeholder="Password"
                  value={restaurant.res_password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control m-1"
                  type="text"
                  name="res_phone"
                  placeholder="Phone"
                  value={restaurant.res_phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control m-1"
                  name="res_address"
                  placeholder="Address"
                  value={restaurant.res_address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Upload Restaurant Banner:
                  <input
                    className="form-control m-1"
                    type="file"
                    name="res_image"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    className="form-check-input m-1"
                    type="checkbox"
                    name="isHomechef"
                    checked={restaurant.isHomechef}
                    onChange={handleInputChange}
                  />
                  Register as Home Chef
                </label>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary mt-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Restaurant"}
                </button>
              </div>
              {error && <p className="text-danger mt-3">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
