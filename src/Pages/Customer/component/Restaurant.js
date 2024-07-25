import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbarcustomer from "./NavbarCustomer";
import PopupCard from "./PopupCard";
import { Cart2 } from "react-bootstrap-icons";
import ViewCart from "./ViewCart";

export default function Restaurant() {
  const API_BASE_URL = `http://localhost/WebApplication2/api`;

  const [showPopup, setShowPopup] = useState(false);
  const [cid, setcid] = useState();
  const location = useLocation();
  const state = location.state; // Access the state object
  const ResId = state && state.id;
  const ResName = state && state.name;
  const [listItems, setListItems] = useState([]);
  const [BID, setBID] = useState();
  const [hasItems, sethasItems] = useState();
  const [item, setitem] = useState();
  const [total, settotal] = useState();
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push("⭐"); // Filled star
      } else {
        stars.push("☆"); // Empty star
      }
    }
    return stars.join("");
  };

  useEffect(() => {
    setcid(localStorage.getItem("c_id"));
    handleViewCart();

    fetch(
      `${API_BASE_URL}/Customer/SpecificRestaurantItems?restaurantId=${ResId}`,
      {
        method: "get",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setListItems(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant items:", error);
      });
  }, [ResId]);
  const handleViewCart = () => {
    fetch(
      `${API_BASE_URL}/customers/ViewCart?cid=${cid}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        // Assuming data contains sumOfTotalPrice and sumOfQuantity
        const { sumOfTotalPrice, sumOfQuantity } = data;

        // Update state with received data
        sethasItems(true);
        setitem(sumOfQuantity);
        console.log(sumOfQuantity);
        settotal(sumOfTotalPrice);
        sethasItems(true);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        // Handle error, maybe show an error message to the user
      });
  };
  const handleAddItemClick = (id) => {
    setShowPopup(true);
    setBID(id);
    handleViewCart();
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const handleSearch = (value) => {
    setSearchedValue(value);
    filterSearch();
  };
  const filterSearch = () => {
    fetch(
      `${API_BASE_URL}/customers/SearchSpecificRestaurantItems?SearchedValue=${searchedValue}&resid=${ResId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSearchedItems(data);
          console.log(data);
        } else {
          setSearchedItems([]); // Clear searched items if no results found
        }
      });
  };

  return (
    <>
      {/* <NavbarCustomer
        filter={false}
        PlaceHolder={"search by Food"}
        handleSearch={handleSearch}
      /> */}
      <Navbarcustomer />
      <div className="container-fluid">
        {listItems.map((item) => (
          <div key={item.id} className="row mb-3 py-1">
            <div className="col-md-2"></div>
            <div className="col-md-8 justify-content-center align-items-center h-100">
              <div
                className="card border-danger border-2"
                style={{ backgroundColor: "#FDEAEA" }}
              >
                <div className="card-body d-flex">
                  <img
                    src={`http://localhost/WebApplication2/Content/FoodItems/${item.f_image}`}
                    className="img-fluid me-3 my-2"
                    style={{
                      borderRadius: "1rem",
                      maxWidth: "15rem",
                      maxHeight: "15rem",
                    }}
                  />
                  <div>
                    <h5 className="card-title fs-3 text-danger">{item.name}</h5>
                    <p className="card-text">
                      {item.description ||
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"}
                    </p>
                    <div className="Row d-flex bg-danger rounded align-items-center mx-5 fs-5 p-1">
                      <div className="col-md-6 text-center text-white bg-danger">
                        From Rs {item.min_price || "N/A"} pkr
                      </div>
                      <div className="col-md-6 text-danger text-center rounded bg-white">
                        {item.people|| "N/A"} people per Serving
                      </div>
                    </div>
                    <p className="card-text p-1 fs-4 rounded text-black text-justify text-center">
                      {renderStars(item.foodRating) || "NOT RATED YET"}
                    </p>
                  </div>
                </div>
                <div
                  className="col-md-2 rounded text-white fs-5 my-1 bg-danger text-center justify-content-center align-self-center"
                  onClick={() => handleAddItemClick(item.id)}
                >
                  Add
                  <Cart2 className="mx-1 text-white fs-2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PopupCard bid={BID} show={showPopup} onHide={handleClosePopup} />
      {/* <ViewCart hasItems={true} item={4} total={500} /> use this if error solve*/}

      {/* <ViewCart
        hasItems={true /*hasItems commented
        item={item}
        total={total}/> */}
    </>
  );
}
