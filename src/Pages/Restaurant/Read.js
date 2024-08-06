import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { NavbarHome } from "./components/NavbarHome";
import { useLocation } from "react-router-dom";

export default function Read() {
  const API_BASE_URL = `http://localhost/WebApplication2/api`;
  const [productDetails, setProductDetails] = useState({
    f_image: "product_image_url",
    f_ingredients: "Product ingredients",
    description:
      "This is a longer description that may span multiple lines. It's essential to maintain readability while displaying lengthy content. Using a suitable layout and styling can enhance the user experience.",
    taste: "Product taste",
    category: "Product category",
    sizeOrWeight: "Product size or weight",
    servesPerPeople: "Number of servings per people",
    readyTime: "Product ready time",
  });
  const location = useLocation();
  useEffect(() => {
    const { b_id } = location.state;
    const value = b_id;
    if (!value) return; // Handle the case where value is undefined

    console.log("This is bid received: " + value);

    // Fetch product details from API
    fetch(
      `${API_BASE_URL}/Restaurant/ProductDetails?bId=${value}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProductDetails(...data);
        console.log("Product details:", data);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, []);

  return (
    <>
      <NavbarHome />
      <Container>
        {productDetails && (
          <>
            <Row className="mt-5">
              <Col xs={12} md={6} className="text-center">
                <Image
                  src={`http://localhost/WebApplication2/Content/FoodItems/${productDetails.f_image}`}
                  fluid
                  width={350}
                />
              </Col>
              <Col xs={12} md={6} className="mt-3 mt-md-0">
                <h2>Product Details</h2>
                <h1 className="bg-white text-danger">
                  {productDetails.f_name}
                </h1>
                <p>
                  <strong>Ingredients:</strong> {productDetails.f_ingredients}
                </p>
                <p>
                  <strong>Description:</strong> {productDetails.description}
                </p>
                <p>
                  <strong>Taste:</strong> {productDetails.taste}
                </p>
                <p>
                  <strong>Category:</strong> {productDetails.f_category}
                </p>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
