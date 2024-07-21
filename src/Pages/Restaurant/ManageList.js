import React from "react";
import { useEffect, useState } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { Trash, PencilSquare, Eye } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { NavbarHome } from "./components/NavbarHome";
import { useTheme } from "../../context/ThemeContext";

export default function ManageList() {
  const {theme}=useTheme();
  const API_BASE_URL = "http://localhost/WebApplication2/api";
  const Navigate = useNavigate();
  const res_id = localStorage.getItem("res_id");
  const [myList, setMyList] = useState([]);
  const handleDelete = (x) => {
    fetch(
      `${API_BASE_URL}/Restaurant/DeleteFoodItemWithDetails?id=${x}`,
      {
        method: "delete",
      }
    );
    window.location.reload();
  };
  const handleEdit = (x) => {
    console.log("data edited at bid" + x);
    Navigate("/Edit", { state: { b_id: x } });
  };
  const handleRead = (x) => {
    console.log(`see details of bid${x}`);
    Navigate("/readonly", { state: { b_id: x } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/Restaurant/GetFoodItemsByRestaurant?&restaurantId=${res_id}`
        );
        const data = await response.json();
        setMyList(data);
        console.log(myList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function: called when component unmounts or when dependencies change
      // Add any cleanup logic here
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <NavbarHome />
      <Container>
        <Row>
          <Col>
            <Table  bordered hover responsive>
              <thead>
                <tr  style={{borderColor:theme==="light"?"#EBF3F2":"red"}}>
                  <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Food name</th>
                  <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Category</th>
                  <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Ingredients</th>
                  <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Description</th>
                  <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Taste</th>
                  <th style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {myList.map((item) => (
                  <tr key={item.id}  style={{borderColor:theme==="light"?"#EBF3F2":"red"}}>
                    <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.name}</td>
                    <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.foodCategory}</td>
                    <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.ingredients}</td>
                    <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.description}</td>
                    <td style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>{item.taste}</td>

                    <td className="d-flex"  style={{backgroundColor:theme==="light"?"white":"black",color:theme==="light"?"black":"white"}}>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleRead(item.id)}
                      >
                        <Eye /> Read
                      </Button>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash /> Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(item.id)}
                      >
                        <PencilSquare /> Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}
