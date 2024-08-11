import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Navbar } from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function BigRides() {
  const Navigate=useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routingControlRef = useRef(null);
  const [acceptanceRate, setAcceptanceRate] = useState();
  const [distance, setDistance] = useState(0);
  const [RestaurantLat, setRestaurantLat] = useState(null);
  const [RestaurantLong, setRestaurantLong] = useState(null);
  const [CustomerLat, setCustomerLat] = useState(null);
  const [CustomerLong, setCustomerLong] = useState(null);
  const [RiderLat, setRiderLat] = useState(null);
  const [RiderLong, setRiderLong] = useState(null);
  const [Rides, setRides] = useState([]);
  const [status, setStatus] = useState("not_pickedup");
  const [order, setOrder] = useState();
useEffect(()=>{
  fetch(`http://localhost/webapplication2/api/rider/AcceptanceRate?riderId=${localStorage.getItem("riderId")}`,{method:"GET"})
  .then((response)=>{return response.json()})
  .then((data)=>{setAcceptanceRate(data)})
},[])
  // Function to select a random ride and update the state
  const selectRandomRide = (rides) => {
    if (rides.length > 0) {
      const randomIndex = Math.floor(Math.random() * rides.length);
      const selectedRide = rides[randomIndex];

      setRestaurantLat(selectedRide.Restaurant.latitude);
      setRestaurantLong(selectedRide.Restaurant.longitude);
      setCustomerLat(selectedRide.Customer.latitude);
      setCustomerLong(selectedRide.Customer.longitude);
      setOrder(selectedRide.Orders);
    }
  };

  // Handle decline order
  const handleDeclineOrder = () => {
    fetch(`http://localhost/WebApplication2/api/rider/RejectRide?riderId=${localStorage.getItem("riderId")}`, { method: "POST" });
    selectRandomRide(Rides); // Select another ride when the current one is declined
  };

  // Get all rides and set random ride data
  useEffect(() => {
    fetch(`http://localhost/WebApplication2/api/rider/givemerides?riderId=${localStorage.getItem("riderId")}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setRides(data);
        selectRandomRide(data); // Select a random ride on initial load
      })
      .catch((error) => console.error("Error fetching rides", error));
  }, []);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const mapInstance = L.map(mapRef.current).setView([33.6844, 73.0479], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);

      mapInstanceRef.current = mapInstance;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off();
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && RestaurantLat && RestaurantLong && CustomerLat && CustomerLong) {
      const map = mapInstanceRef.current;

      const restaurantLocation = L.latLng(RestaurantLat, RestaurantLong);
      const customerLocation = L.latLng(CustomerLat, CustomerLong);

      if (routingControlRef.current) {
        routingControlRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      const routingControl = L.Routing.control({
        waypoints: [restaurantLocation, customerLocation],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        lineOptions: {
          styles: [{ color: "GREY", weight: 6 }],
        },
        createMarker: (i, waypoint, n) => {
          const markerOptions = {
            icon: L.icon({
              iconUrl: i === 0 ? "path-to-restaurant-icon.png" : "path-to-customer-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
          };
          return L.marker(waypoint.latLng, markerOptions);
        },
      }).addTo(map);

      routingControl.on("routesfound", function (e) {
        const route = e.routes[0];
        setDistance((route.summary.totalDistance / 1000).toFixed(1));
      });

      routingControlRef.current = routingControl;
    }
  }, [RestaurantLat, RestaurantLong, CustomerLat, CustomerLong]);

  useEffect(() => {
    if (RiderLat && RiderLong) {
      const map = mapInstanceRef.current;
      const riderLocation = L.latLng(RiderLat, RiderLong);
      const restaurantLocation = L.latLng(RestaurantLat, RestaurantLong);

      if (routingControlRef.current && map.hasLayer(routingControlRef.current)) {
        routingControlRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      const routingControl = L.Routing.control({
        waypoints: status === "pickedup" ? [riderLocation, L.latLng(CustomerLat, CustomerLong)] : [riderLocation, restaurantLocation],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        lineOptions: {
          styles: [{ color: "ORANGE", weight: 6 }],
        },
        createMarker: (i, waypoint, n) => {
          const markerOptions = {
            icon: L.icon({
              iconUrl: i === 0 ? "path-to-rider-icon.png" : "path-to-restaurant-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
          };
          return L.marker(waypoint.latLng, markerOptions);
        },
      }).addTo(map);

      routingControl.on("routesfound", function (e) {
        const route = e.routes[0];
        setDistance((route.summary.totalDistance / 1000).toFixed(1));
      });

      routingControlRef.current = routingControl;
    }
  }, [RiderLat, RiderLong, status]);

  const getRiderLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setRiderLat(position.coords.latitude);
          setRiderLong(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleAcceptOrder = (orderId) => {
    getRiderLocation();
    fetch(`http://localhost/webapplication2/api/rider/AcceptRide?orderId=${order.id}&riderId=${localStorage.getItem("riderId")}`, { method: "POST" });
    setStatus("accepted");
  };

  const handlePickedUp = () => {
    setStatus("pickedup");
    fetch(`http://localhost/webapplication2/api/rider/PickedUpRide?orderId=${order.id}&riderId=${localStorage.getItem("riderId")}`, { method: "POST" });
    getRiderLocation();
  };

  const handleDelivered = () => {
    setStatus("delivered");
    fetch(`http://localhost/webapplication2/api/rider/DeliveredRide?orderId=${order.id}&riderId=${localStorage.getItem("riderId")}`, { method: "POST" });
    getRiderLocation();
    Navigate(`/MyRides`)
    
  };

  return (
    <div className="pb-5" >
    <Navbar/>
    <div className="container  " style={{paddingTop:"7rem"}}>
      <div className="text-center">
        {distance!=0&&(
        <button
          onClick={handleDeclineOrder}
          className="bg-danger text-white p-2 border border-0 rounded fs-4"
        >
          DECLINE
        </button>
        )}
        <div>Your acceptance rate is {acceptanceRate}%</div>
      </div>

      <h2 className="text-center mt-4">NEW ORDER</h2>
      <h4 className="text-center">Deliver Food at DoorStep</h4>

      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "400px" }}
      ></div>

      <div className="text-center mt-4">
        <p>Pickup: ({RestaurantLat}, {RestaurantLong})</p>
        <p>Dropoff: ({CustomerLat}, {CustomerLong})</p>
        <p>Distance: {distance} km</p>
        {status === "not_pickedup"&&distance!=0 && (
          <button
            onClick={handleAcceptOrder}
            className="bg-danger text-white p-2 border border-0 rounded fs-4"
          >
            ACCEPT RIDE
          </button>
        )}
        {status === "accepted" && (
          <button
            onClick={handlePickedUp}
            className="bg-success text-white p-2 border border-0 rounded fs-4"
          >
            PICKED UP
          </button>
        )}
        {status === "pickedup" && (
          <button
            onClick={handleDelivered}
            className="bg-primary text-white p-2 border border-0 rounded fs-4"
          >
            DELIVERED
          </button>
        )}
      </div>
    </div>
    </div>
  );
}
