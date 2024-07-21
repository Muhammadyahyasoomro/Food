import React, { useEffect, useState } from "react";
import { NavbarHome } from "./components/NavbarHome";
import { Link, useLocation } from "react-router-dom";
import { Table, Form, FormControl, Button, Card } from "react-bootstrap";
import { PencilSquare, Upload } from "react-bootstrap-icons";
import alternativeImage from "../../Components/assets/alternativeImage.png";
import {useTheme} from "../../context/ThemeContext"
import axios from "axios";

export default function Edit() {
  const API_BASE_URL = "http://localhost/WebApplication2/api";
  const {theme}=useTheme();
  const location = useLocation();
  const { state } = location;
  const [imageName, setImageName] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [category, setCategory] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFoodItem, setSelectedFoodItem] = useState("");
  const [belongsTo, setBelongsTo] = useState([]);
  const [plans, setPlans] = useState([]);
  const [image, setImage] = useState();
  const [newPlans, setNewPlans] = useState({
    foodItem_id: state?.b_id,
    unit: null,
    price: null,
    peopleperserving: null,
    f_readytime: null,
  });

  useEffect(() => {
    fetchCategory();
    fetchBelongTo();
    fetchPlans();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
   
    console.log("Selected Image:", file.name);

    // Update the image immediately when selected
    updateImage(file);
  };
  const updateImage = (file) => {
    console.log(belongsTo)
    const url = `${API_BASE_URL}/restaurant/UpdateImage?id=${
      belongsTo.food.id
    }&resid=${localStorage.getItem("res_id")}`;
    const formData = new FormData();
    formData.append("FoodImage", file);

    fetch(url, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Image upload success:", data);
      })
      .catch((error) => {
        console.error("Image upload error:", error);
      });
  };

  const handleUploadClick = () => {
    document.getElementById("upload").click();
  };

  const handleNewPlan = () => {
    if (newPlans.price && newPlans.unit) {
      fetch(`${API_BASE_URL}/restaurant/InsertOnce`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlans),
      }).then((response) => {
        if (response.ok) {
          console.log("New plan inserted successfully");
          window.location.reload();
        } else {
          console.log("Issues with object");
        }
      });
    } else {
      console.log("Object is empty");
    }
  };

  const fetchBelongTo = () => {
    fetch(
      `${API_BASE_URL}/restaurant/FetchFoodItem?id=${state?.b_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBelongsTo(data);
        if (data.food) {
          setImage(data.food.f_image);
        }
      })
      .catch((error) => {
        console.error("Error fetching Belongto:", error);
      });
  };

  const fetchPlans = () => {
    fetch(
      `${API_BASE_URL}/restaurant/FetchFoodData?id=${state?.b_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPlans(data.foodDetail);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching plans and pricing:", error);
      });
  };

  const fetchCategory = () => {
    const apiUrl = `${API_BASE_URL}/restaurant/fetchcategory`;

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
      const apiUrl = `${API_BASE_URL}/restaurant/fetchfoodbycategory?category=${category}`;

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

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setBelongsTo((prevState) => ({
      ...prevState,
      food: {
        ...prevState.food,
        foodCategory: category,
      },
    }));
    fetchFoodItem(category);
  };

  const handleFoodItemChange = (e) => {
    const foodItem = e.target.value;
    setSelectedFoodItem(foodItem);
    setBelongsTo((prevState) => ({
      ...prevState,
      food: {
        ...prevState.food,
        name: foodItem,
      },
    }));
  };

  const handleChange = (e, key) => {
    const { value } = e.target;
    setBelongsTo((prevState) => {
      const newState = { ...prevState };
      newState.food[key] = value;
      return newState;
    });
  };

  const handlePlans = (e) => {
    const { name, value } = e.target;
    setNewPlans((prevPlans) => ({
      ...prevPlans,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if belongsTo and belongsTo.food have the required data
    if (!belongsTo || !belongsTo.food) {
      console.error("BelongsTo or belongsTo.food is not defined check please");
      return;
    }

    const { food } = belongsTo;
    console.log("BelongsTo before submission:", food);

    const formData = new FormData();
    formData.append("id", food.id || "");
    formData.append("foodCategory", food.foodCategory || "");
    formData.append("name", food.name || "");
    formData.append("ingredients", food.ingredients || "");
    formData.append("description", food.description || "");
    formData.append("taste", food.taste || "");
    formData.append("restaurant_id", localStorage.getItem("res_id") || "");
    if (image) {
      formData.append("image", image);
    }

    console.log("FormData before submission:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    fetch(
      `${API_BASE_URL}/restaurant/UpdateFoodItem`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Update belongsTo response:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating belongsTo:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(
      `${API_BASE_URL}/restaurant/DeleteFoodItemDetail?id=${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting plans:", error);
      });
  };

  return (
    <>
      <NavbarHome />
      <div className="d-flex justify-content-center col-sm-5">
        <Card
          style={{
            backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white",
            border: "2px solid red",
            borderRadius: "10px",

          }}
          className="text-center"
        >
          <Card.Body>
            <div
              className="d-flex text-center justify-content-center m-1 align-items-center"
             
              style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white",}}
              onClick={handleUploadClick}
            >
              <input
              loading="lazy"
               style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white", display: "none"}}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                
                id="upload"
              />
              <img
              loading="lazy"
                style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white", width: 150 }}
                src={
                  image
                    ? `http://localhost/WebApplication2/content/FoodItems/${image}`
                    : alternativeImage
                }
                alt="Food"
              />
              <Upload
                className="position-absolute"
                style={{ color: "red", width: 50, height: 50 }}
              />
            </div>
            <Form onSubmit={handleSubmit}>
              {belongsTo.food && (
                <div style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white",}}>
                  {isEditing ? (
                    <div>
                      <div
                        style={{
                          border: "2px solid blue",
                          borderRadius: 20,
                        }}
                      >
                        <div className="Row">
                          Category: {belongsTo.food.foodCategory}
                        </div>
                        <div className="Row">
                          Food Name: {belongsTo.food.name}
                        </div>
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
                          onChange={handleCategoryChange}
                        >
                          <option value="">
                            {belongsTo.food.foodCategory}
                          </option>
                          {category.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        controlId="formFoodItem"
                        className="d-flex my-1"
                      >
                        <Form.Label className="mx-1 px-2">
                          Select Food Item
                        </Form.Label>
                        <Form.Control
                          style={{ width: 370 }}
                          as="select"
                          value={selectedFoodItem}
                          onChange={handleFoodItemChange}
                        >
                          <option value="">{belongsTo.food.name}</option>
                          {foodList.map((food, index) => (
                            <option key={index} value={food.f_name}>
                              {food.f_name}
                            </option>
                          ))}
                        </Form.Control>
                     
                      </Form.Group>
                    </div>
                  )}
                  <br />

                  <FormControl
                    key="f_ingredients"
                    type="text"
                    placeholder="Ingredients"
                    value={belongsTo.food.ingredients || ""}
                    onChange={(e) => handleChange(e, "ingredients")}
                  />
                  <br />
                  <FormControl
                    key="description"
                    type="text"
                    placeholder="Description"
                    value={belongsTo.food.description || ""}
                    onChange={(e) => handleChange(e, "description")}
                  />
                  <br />
                  <FormControl
                    key="taste"
                    type="text"
                    placeholder="Taste"
                    value={belongsTo.food.taste || ""}
                    onChange={(e) => handleChange(e, "taste")}
                  />
                  <br />
                </div>
              )}

              <Button variant="danger" type="submit" className="rounded">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="col-sm-3">
          <Table striped bordered hover>
            <thead>
              <tr style={{borderColor:theme==="light"?"#EBF3F2":"red"}}>
                <th  style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Ready Time</th>
                <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Size/Weight</th>
                <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Price</th>
                <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Serve Per People</th>
                <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((item, index) => (
                <tr key={index} style={{borderColor:theme==="light"?"#EBF3F2":"red"}}>
                  <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.f_readytime}</td>
                  <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.unit}</td>
                  <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.price}</td>
                  <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.peopleperserving}</td>
                  <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>
                    <button
                      className="bg-danger text-white border-0 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>
                  <input style={{ backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}
                    type="text"
                    name="f_readytime"
                    onChange={handlePlans}
                    placeholder="10 mins"
                  />
                </td>
                <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>
                  <input  style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}
                    type="text"
                    name="unit"
                    onChange={handlePlans}
                    placeholder="Large"
                  />
                </td>
                <td  style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>
                  <input style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}
                    type="text"
                    name="price"
                    onChange={handlePlans}
                    placeholder="10.99 US$"
                  />
                </td>
                <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>
                  <input style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}
                    type="text"
                    name="peopleperserving"
                    onChange={handlePlans}
                    placeholder="2"
                  />
                </td>
                <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>
                  <button
                    className="bg-danger border-0 rounded text-white p-2 px-3"
                    onClick={handleNewPlan}
                  >
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
