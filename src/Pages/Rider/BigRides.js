import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polygon,
  Circle,
  Polyline,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Navbar } from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function BigRides({ riderId }) {
  const [initialLatLng, setInitialLatLng] = useState({
    lat: 33.6844,
    lng: 73.0479,
  });
  const [markers, setMarkers] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [circles, setCircles] = useState([]);
  const [zonePoints, setZonePoints] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [status, setStatus] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [distance, setDistance] = useState(0.0);
  const [acceptanceRateText, setAcceptanceRateText] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [polylinePath, setPolylinePath] = useState([]);

  const mapRef = useRef(null);
  const history = useNavigate();

  const libraries = ["places"];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDUzYaiX303nr6XqMvtl8OEgFYIKc2scgI",
    libraries: libraries,
  });

  // Function to center map on customer's location
  const centerMapOnCustomer = (customerLocation) => {
    setInitialLatLng({ lat: customerLocation.lat, lng: customerLocation.lng });
  };

  useEffect(() => {
    fetchRideDetails();
    fetchAcceptanceRate();
  }, []);

  useEffect(() => {
    if (restaurantLocation && customerLocation) {
      fetchDirections();
      setPolylinePath([
        { lat: restaurantLocation.lat, lng: restaurantLocation.lng },
        { lat: customerLocation.lat, lng: customerLocation.lng },
      ]);
      centerMapOnCustomer(customerLocation); // Center the map on the customer's location

      // Update markers and circles when locations change
      setMarkers([
        {
          position: {
            lat: restaurantLocation.lat,
            lng: restaurantLocation.lng,
          },
          title: "Restaurant Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png", // Pink marker for restaurant
        },
        {
          position: { lat: customerLocation.lat, lng: customerLocation.lng },
          title: "Customer Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green marker for customer
        },
      ]);

      setCircles([
        {
          center: { lat: customerLocation.lat, lng: customerLocation.lng },
          radius: 1000,
          options: {
            fillColor: "#FF6666", // Light red color for the circle
            fillOpacity: 0.2,
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 2,
          },
        },
      ]);
    }
  }, [restaurantLocation, customerLocation]);

  const giveMeRides = async (riderId) => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/GiveMeRides?riderId=${localStorage.getItem(
        "riderId"
      )}`
    ).then((res) => res.json());
  };

  const getZoneByRestaurantId = async (restaurantId) => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/GetZoneByRestaurantId?restaurantID=${restaurantId}`
    ).then((res) => res.json());
  };

  const getLatlongOfRestaurant = async (restaurantId) => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/GetLatlongOfRestaurant?restaurantID=${restaurantId}`
    ).then((res) => res.json());
  };

  const getLatlongOfCustomer = async (customerId) => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/GetLatlongOfCustomer?customer_id=${customerId}`
    ).then((res) => res.json());
  };

  const getDistanceToCustomerToRestaurant = async (
    lat1,
    lng1,
    lat2,
    lng2,
    unit
  ) => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/DistanceToCustomerToRestaurant?Customerlat1=${lat1}&Customerlon1=${lng1}&Restaurantlat2=${lat2}&Restaurantlon2=${lng2}&unit=K`
    ).then((res) => res.json());
  };

  const acceptanceRate = async (riderId) => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/AcceptanceRate?riderId=${localStorage.getItem(
        "riderId"
      )}`
    ).then((res) => res.json());
  };

  const acceptRide = async (orderId, riderId) => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/AcceptRide?orderId=${orderId}&riderId=${localStorage.getItem(
        "riderId"
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());
  };

  const rejectRide = async () => {
    return fetch(
      `http://localhost/FoodDeliverySystems/api/rider/RejectRide?riderId=${localStorage.getItem(
        "riderId"
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());
  };

  const fetchRideDetails = async () => {
    try {
      const result = await giveMeRides(localStorage.getItem("riderId"));
      console.log("Fetched ride details:", result); // Log the fetched result
      setOrderId(result.id);
      setCustomerId(result.customer_id);
      setRestaurantId(result.restaurant_id || null); // Ensure restaurantId is set properly
      setStatus(result.status);

      if (result.restaurant_id) {
        fetchZonePoints(result.restaurant_id);
        fetchRestaurantLocation(result.restaurant_id); // Pass restaurantId to the function
      }

      if (result.customer_id) {
        fetchCustomerLocation(result.customer_id); // Pass customerId to the function
      }
    } catch (e) {
      console.error("Error fetching ride details:", e);
    }
  };

  const fetchZonePoints = async (restaurantId) => {
    try {
      const zones = await getZoneByRestaurantId(restaurantId);
      setZonePoints(zones);

      if (zones.length > 0) {
        const latSum = zones.reduce((sum, point) => sum + point.latitude, 0);
        const lngSum = zones.reduce((sum, point) => sum + point.longitude, 0);
        setInitialLatLng({
          lat: latSum / zones.length,
          lng: lngSum / zones.length,
        });

        drawPolygon(zones);
      }
    } catch (e) {
      console.error("Error fetching zone points:", e);
    }
  };

  const fetchRestaurantLocation = async (restaurantId) => {
    try {
      const location = await getLatlongOfRestaurant(restaurantId);
      console.log("restaurant id ", restaurantId);
      console.log("Fetched restaurant location:", location); // Log the fetched location
      setRestaurantLocation({
        lat: location.latitude,
        lng: location.longitude,
      });
      setPickupAddress(location.address);

      // Log restaurant coordinates
      console.log(
        "Restaurant Coordinates: ",
        location.latitude,
        location.longitude
      );

      // Set markers and circles
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          position: { lat: location.latitude, lng: location.longitude },
          title: "Restaurant Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png", // Pink marker for restaurant
        },
      ]);

      setCircles((prevCircles) => [
        ...prevCircles,
        {
          center: { lat: location.latitude, lng: location.longitude },
          radius: 1000,
          options: {
            fillColor: "#FF6666", // Light red color for the circle
            fillOpacity: 0.2,
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 2,
          },
        },
      ]);

      calculateDistance(); // Calculate distance after setting locations
    } catch (e) {
      console.error("Error fetching restaurant location:", e);
    }
  };

  const fetchCustomerLocation = async (customerId) => {
    try {
      const location = await getLatlongOfCustomer(customerId);
      console.log("Fetched customer location:", location); // Log the fetched location
      setCustomerLocation({ lat: location.latitude, lng: location.longitude });
      setDropoffAddress(location.address);

      // Log customer coordinates
      console.log(
        "Customer Coordinates: ",
        location.latitude,
        location.longitude
      );

      // Set markers and circles
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          position: { lat: location.latitude, lng: location.longitude },
          title: "Customer Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green marker for customer
        },
      ]);

      setCircles((prevCircles) => [
        ...prevCircles,
        {
          center: { lat: location.latitude, lng: location.longitude },
          radius: 1000,
          options: {
            fillColor: "#FF6666", // Light red color for the circle
            fillOpacity: 0.2,
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 2,
          },
        },
      ]);

      calculateDistance(); // Calculate distance after setting locations
    } catch (e) {
      console.error("Error fetching customer location:", e);
    }
  };

  const calculateDistance = async () => {
    if (restaurantLocation && customerLocation) {
      try {
        const distance = await getDistanceToCustomerToRestaurant(
          customerLocation.lat,
          customerLocation.lng,
          restaurantLocation.lat,
          restaurantLocation.lng,
          "K"
        );
        setDistance(distance);
      } catch (e) {
        console.error("Error calculating distance:", e);
      }
    }
  };

  const fetchAcceptanceRate = async () => {
    try {
      const rate = await acceptanceRate(riderId);
      setAcceptanceRateText(`Your acceptance rate is ${rate}%`);
    } catch (e) {
      console.error("Error fetching acceptance rate:", e);
    }
  };

  const fetchDirections = async () => {
    if (restaurantLocation && customerLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: new window.google.maps.LatLng(
            restaurantLocation.lat,
            restaurantLocation.lng
          ),
          destination: new window.google.maps.LatLng(
            customerLocation.lat,
            customerLocation.lng
          ),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  const drawPolygon = (zonePoints) => {
    setPolygons([
      {
        paths: zonePoints.map((point) => ({
          lat: point.latitude,
          lng: point.longitude,
        })),
        options: {
          fillColor: "#0000FF",
          fillOpacity: 0.3,
          strokeColor: "#0000FF",
          strokeOpacity: 1,
          strokeWeight: 2,
        },
      },
    ]);
  };

  const handleAcceptOrder = async () => {
    try {
      await acceptRide(orderId, riderId);
      alert("Ride accepted successfully.");
      history.push("/ActiveRide");
    } catch (e) {
      console.error("Failed to accept ride:", e);
    }
  };

  const handleRejectOrder = async () => {
    try {
      await rejectRide(riderId);
      alert("Order rejected successfully.");
      window.location.reload(); // Reload the page to fetch another order
    } catch (e) {
      console.error("Failed to reject ride:", e);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "8rem" }}>
        <h2 className="text-center">NEW ORDER</h2>
        <p className="text-center">Deliver Food at DoorStep</p>
        <button
          onClick={handleRejectOrder}
          disabled={!orderId}
          className="bg-danger text-white p-2 border border-0 rounded fs-4"
        >
          DECLINE
        </button>
        <div>{acceptanceRateText}</div>
        <div
          style={{
            height: "300px",
            width: "100%",
            border: "1px solid black",
            borderRadius: "20px",
          }}
        >
          <GoogleMap
            center={initialLatLng}
            zoom={15}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            onLoad={(map) => (mapRef.current = map)}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                title={marker.title}
                icon={marker.icon}
              />
            ))}
            {polygons.map((polygon, index) => (
              <Polygon
                key={index}
                paths={polygon.paths}
                options={polygon.options}
              />
            ))}
            {circles.map((circle, index) => (
              <Circle
                key={index}
                center={circle.center}
                radius={circle.radius}
                options={circle.options}
              />
            ))}
            <Polyline
              path={polylinePath}
              options={{ strokeColor: "#0000FF", strokeWeight: 2 }} // Blue color for the polyline
            />
            {directionsResponse ? (
              <DirectionsRenderer directions={directionsResponse} />
            ) : (
              <Polyline
                path={polylinePath}
                options={{ strokeColor: "#0000FF", strokeWeight: 2 }}
              />
            )}
          </GoogleMap>
        </div>
        <p>
          Pickup: {pickupAddress} ({restaurantLocation?.lat},{" "}
          {restaurantLocation?.lng})
        </p>
        <p>
          Dropoff: {dropoffAddress} ({customerLocation?.lat},{" "}
          {customerLocation?.lng})
        </p>
        <p>Distance: {distance} km</p>
        <button
          onClick={handleAcceptOrder}
          className="border border-0  bg-danger rounded text-white fs-4 p-2"
          disabled={!orderId}
        >
          ACCEPT RIDE
        </button>
      </div>
    </>
  );
}
