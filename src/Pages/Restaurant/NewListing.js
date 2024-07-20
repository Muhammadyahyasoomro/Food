import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NavbarHome } from "./components/NavbarHome";
import { useTheme } from "../../context/ThemeContext";
import { useCategory } from "../../context/CategoryContext";
import NewListingCategory from "./components/NewListingCategory";

const API_BASE_URL = "http://localhost/WebApplication2/api";

const NewListing = () => {
  const { next, CheckNext } = useTheme();
  const { category, subcategory } = useCategory();
  const Navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
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
    name: ""
   });

  const FetchBID = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurant/GetLatestFoodItemId`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      Navigate("/PlansandPricing", { state: { b_id: data } });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setBelongsto((prevState) => ({
      ...prevState,
      foodCategory: category?.value || "",
      name: subcategory?.value || "",
    }));
  
    const formData = new FormData();
    formData.append("FoodItem", JSON.stringify(belongsto));
    if (belongsto.f_image) {
      formData.append("f_image", belongsto.f_image);
    }
  
    try {
      const response = await axios.post(`${API_BASE_URL}/restaurant/AddFoodItem`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        FetchBID();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePath(URL.createObjectURL(selectedFile));
    setBelongsto((prevState) => ({
      ...prevState,
      f_image: selectedFile,
    }));
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
                    {filePath && (
                      <img
                        src={filePath}
                        alt="Food"
                        style={{ maxWidth: "100px", marginTop: "10px" }}
                      />
                    )}
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
                      Is item Healthy for BloodPressure Diabetes or lactose patients?
                    </Row>
                    <Row className="fs-5 text-danger">
                      <Col>
                        <input
                          type="radio"
                          name="disease"
                          onChange={(e) =>
                            setBelongsto((prevState) => ({
                              ...prevState,
                              DiseaseName: e.target.value,
                              HasDisease: true,
                            }))
                          }
                          value="lactose"
                        />
                        Lactose
                      </Col>
                    </Row>
                    <Row>
                      <Col className="fs-5 text-danger">
                        <input
                          type="radio"
                          name="disease"
                          onChange={(e) =>
                            setBelongsto((prevState) => ({
                              ...prevState,
                              DiseaseName: e.target.value,
                              HasDisease: true,
                              foodCategory:category,
                              name:subcategory
                            }))
                          }
                          value="bp"
                        />
                        BloodPressure
                      </Col>
                    </Row>
                    <Row>
                      <Col className="fs-5 text-danger">
                        <input
                          type="radio"
                          name="disease"
                          onChange={(e) =>
                            setBelongsto((prevState) => ({
                              ...prevState,
                              DiseaseName: e.target.value,
                              HasDisease: true,
                            }))
                          }
                          value="sugar"
                        />
                        Diabetes
                      </Col>
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
