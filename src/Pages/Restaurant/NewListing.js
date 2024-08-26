import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarHome } from "./components/NavbarHome";
import { useTheme } from "../../context/ThemeContext";
import { useCategory } from "../../context/CategoryContext";
import NewListingCategory from "./components/NewListingCategory";

const API_BASE_URL = "http://localhost/WebApplication2/api";

const NewListing = () => {
  const { next, CheckNext } = useTheme();
  const { category, subcategory } = useCategory();
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [file, setFile] = useState(null);

  const [belongsto, setBelongsto] = useState({
    restaurant_id: localStorage.getItem("res_id") || "",
    f_id: "",
    ingredients: "",
    description: "",
    taste: "",
    f_image: null,
    HasDisease: "",
    DiseaseName: "",
    foodCategory: "",
    name: "",
  });

  const handleSelectChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }

    setSelectedOptions(selectedValues);

    // Update `HasDisease` and `DiseaseName` in `belongsto`
    setBelongsto((prevState) => ({
      ...prevState,
      HasDisease: selectedValues.length > 0 ? true : false,
      DiseaseName: selectedValues.join(", "),
    }));
  };

  const FetchBID = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/restaurant/GetLatestFoodItemId`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      navigate("/PlansandPricing", { state: { b_id: data } });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedBelongsto = {
      ...belongsto,
      foodCategory: category?.value || "",
      name: subcategory?.value || "",
    };

    const formData = new FormData();
    formData.append("FoodItem", JSON.stringify(updatedBelongsto));
    if (file) {
      formData.append("f_image", file);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/restaurant/AddFoodItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        FetchBID();
        CheckNext();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      <NavbarHome />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit} style={{ color: "red" }}>
              {next === 0 && <NewListingCategory />}

              {next === 1 && (
                <>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={belongsto.description}
                      onChange={(e) =>
                        setBelongsto((prevState) => ({
                          ...prevState,
                          description: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formIngredients">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                      type="text"
                      value={belongsto.ingredients}
                      onChange={(e) =>
                        setBelongsto((prevState) => ({
                          ...prevState,
                          ingredients: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formTaste">
                    <Form.Label>Taste</Form.Label>
                    <Form.Control
                      type="text"
                      value={belongsto.taste}
                      onChange={(e) =>
                        setBelongsto((prevState) => ({
                          ...prevState,
                          taste: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formFoodImage">
                    <Form.Label>Food Image</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                    <Button
                      variant="outline-danger"
                      onClick={CheckNext}
                      disabled={false}
                      className="mt-3 rounded-pill border border-2 border-danger container fs-1"
                    >
                      Next
                    </Button>
                  </Form.Group>
                </>
              )}

              {next === 2 && (
                <>
                  <Form.Group controlId="formBasicDisease" className="p-3">
                    <Row className="fs-5 container text-danger">
                      Select All diseases that this item can handle?
                    </Row>
                    <Row className="fs-5 text-danger">
                      <select multiple={true} onChange={handleSelectChange}>
                        <option value="lactose">Lactose</option>
                        <option value="sugar">Sugar</option>
                        <option value="bp">Blood Pressure</option>
                        <option value="gluten">Gluten</option>
                      </select>
                    </Row>

                    <Row>
                      {selectedOptions.map((option, index) => (
                        <Breadcrumb key={index}>{option}</Breadcrumb>
                      ))}
                    </Row>
                  </Form.Group>

                  <Button
                    variant="outline-danger"
                    type="submit"
                    className="mt-3 rounded-pill border border-2 border-danger container fs-1"
                  >
                    Submit
                  </Button>
                </>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewListing;
