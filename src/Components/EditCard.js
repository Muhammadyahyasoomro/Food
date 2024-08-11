import React, { useEffect } from "react";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import axios from "axios";
export default function EditCard() {
  const [category, setCategory] = useState([]);
  const [FoodList, setFoodList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFoodItem, setSelectedFoodItem] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [BelongsTo, setBelongsto] = useState([]);
  const [plans, setPlans] = useState([]);
  const fetchPlans = () => {
    fetch(
      `http://localhost/webapplication2/api/Restaurant/fetchplansandpricing?bid=${state.b_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPlans(data);
      })
      .catch((error) => {
        console.error("Error fetching plans and pricing:", error);
      });
  };

  useEffect(() => {
    fetchBelongto();
  });
  const fetchBelongto = () => {
    fetch(
      `http://localhost/webapplication2/api/Restaurant/fetchBelongsto?bid=${state.b_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBelongsto(data);
        fetchFoodItem(data[0]?.BelongsTo?.category);
      })
      .catch((error) => {
        console.error("Error fetching Belongto:", error);
      });

    fetchPlans();
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    const apiUrl = `http://localhost/webapplication2/api/Restaurant/fetchcategory`;

    axios
      .get(apiUrl)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const fetchFoodItem = (category) => {
    if (category) {
      const apiUrl = `http://localhost/webapplication2/api/Restaurant/fetchfoodbycategory?category=${category}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setFoodList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching food items:", error);
        });
    }
  };

  return (
    <Card
      style={{
        border: "2px solid red",
        borderRadius: "10px",
      }}
      className="text-center"
    >
      <Card.Body>
        <Form>
          {BelongsTo.map((item, index) => (
            <div key={index}>
              {isEditing ? (
                <div>
                  <div
                    className=""
                    style={{
                      border: "2px solid blue",
                      borderRadius: 20,
                    }}
                  >
                    <div className="Row">
                      Category : {item.FoodItem.f_category}
                    </div>
                    <div className="Row">FoodName : {item.FoodItem.f_name}</div>
                    <span
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      <PencilSquare size={20} color="red" />
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <Form.Group controlId="formCategory">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCategory}
                      onChange={(e) => {
                        const category = e.target.value;
                        setSelectedCategory(category);
                        fetchFoodItem(category);
                      }}
                    >
                      <option value="">{item.FoodItem.f_category}</option>
                      {category.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formFoodItem" className="d-flex my-1">
                    <Form.Label className="mx-1 px-2">
                      Select Food Item
                    </Form.Label>

                    <Form.Control
                      style={{ width: 370 }}
                      as="select"
                      value={selectedFoodItem}
                      onChange={(e) => {
                        setSelectedFoodItem(e.target.value);
                      }}
                    >
                      <option value=""> {item.FoodItem.f_name}</option>
                      {FoodList.map((food, index) => (
                        <option key={index} value={food.f_id}>
                          {food.f_name}
                        </option>
                      ))}
                    </Form.Control>
                    <Link
                      className="bg-danger border-2 rounded border-danger  text-white fs-1 text-center align-self-center p-1"
                      to={"/newitem"}
                    >
                      +
                    </Link>
                  </Form.Group>
                </div>
              )}
              <br />

              <FormControl
                key={index}
                type="text"
                placeholder="F_ingredients"
                value={item.BelongsTo.f_ingredients}
              />
              <br />
              <FormControl
                key={index}
                type="text"
                placeholder="Description"
                value={item.BelongsTo.description}
              />
              <br />
              <FormControl
                key={index}
                type="text"
                placeholder="Taste"
                value={item.BelongsTo.taste}
              />
              <br />
            </div>
          ))}

          <Button
            variant="danger"
            type="submit"
            className="rounded
"
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
