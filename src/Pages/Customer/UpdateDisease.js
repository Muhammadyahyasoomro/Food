import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { NavbarHome } from "../Restaurant/components/NavbarHome";
import { useNavigate } from "react-router-dom";
import Navbarcustomer from "./component/NavbarCustomer";

export default function UpdateDisease() {
  const [selectedOptions, setSelectedOptions] = useState([]); // State to keep track of selected options
  const [disease, setDisease] = useState(""); // State to store disease information
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle updates when the user submits the selected diseases
  const handleUpdate = () => {
    fetch(
      `http://localhost/WebApplication2/api/customer/UpdateDisease?customer_id=${localStorage.getItem(
        "c_id"
      )}&disease=${selectedOptions.join(", ")}`, // Send selected diseases as a comma-separated string
      {
        method: "POST",
      }
    ).then((response) => {
      if (response.status === 200) {
        console.log("Updated successfully");
        navigate(`/HomeCustomer`); // Navigate to customer home page after successful update
      }
    });
  };

  // Function to fetch the current disease information for the customer
  const fetchDisease = () => {
    fetch(
      `http://localhost/WebApplication2/api/customer/GetCustomerDisease?customer_id=${localStorage.getItem(
        "c_id"
      )}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        const diseases = data.split(", "); // Split the disease string into an array
        setSelectedOptions(diseases); // Set the fetched diseases as the selected options
        setDisease(diseases.join(", ")); // Join the diseases into a comma-separated string
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Function to handle changes when selecting/deselecting options from the dropdown
  const handleSelectChange = (event) => {
    const options = event.target.options; // Get all options in the dropdown
    const selectedValues = [];

    // Iterate through the options and check which ones are selected
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }

    setSelectedOptions(selectedValues); // Update the selectedOptions state with the selected values
    setDisease(selectedValues.join(", ")); // Join the selected values into a comma-separated string and set it as the disease
  };

  // Fetch the disease information when the component loads
  useEffect(() => {
    fetchDisease(); // Call the fetchDisease function on mount
  }, []);

  return (
    <>
      <Navbarcustomer />
      <div className="bg-danger container-md">
        <Form>
          <Form.Group controlId="formBasicDisease" className="p-3">
            <Row className="fs-5 container text-white">
              Add or Remove Any Disease?
            </Row>
            <Row>
              {/* Dropdown list for selecting multiple diseases */}
              <select
                multiple={true}
                onChange={handleSelectChange}
                value={selectedOptions}
              >
                <option value="lactose">Lactose</option>
                <option value="sugar">Sugar</option>
                <option value="bp">Blood Pressure</option>
                <option value="gluten">Gluten</option>
              </select>
            </Row>
            <div className="d-flex justify-content-start">
              {selectedOptions.map((item) => (
                <div key={item} className="bg-secondary me-3 px-2 pills mt-3">
                  {item}
                </div>
              ))}
            </div>
          </Form.Group>
        </Form>

        {/* Button to submit the selected diseases */}
        <button
          className="bg-primary text-white border border-0 rounded p-3"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </>
  );
}
