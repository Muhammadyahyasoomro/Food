import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Tabs,
  Tab,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Navbarcustomer from "./component/NavbarCustomer";

export default function DailyScheduler() {
  const { state: { CartList = [] } = {} } = useLocation();
  const [lunchItems, setLunchItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchTime, setLunchTime] = useState("");
  const [dinnerTime, setDinnerTime] = useState("");
  const [breakfastTime, setBreakfastTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog

  useEffect(() => {
    // Initialize items for each category
    setLunchItems(
      CartList.map((item) => ({ ...item, quantity: item.quantity || 1 }))
    );
    setDinnerItems(
      CartList.map((item) => ({ ...item, quantity: item.quantity || 1 }))
    );
    setBreakfastItems(
      CartList.map((item) => ({ ...item, quantity: item.quantity || 1 }))
    );
  }, [CartList]);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const incrementQuantity = (index) => {
    const currentItems = getCurrentItems();
    const updatedItems = [...currentItems];
    updatedItems[index].quantity += 1;
    setItemsByTab(updatedItems);
  };

  const decrementQuantity = (index) => {
    const currentItems = getCurrentItems();
    const updatedItems = [...currentItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setItemsByTab(updatedItems);
    }
  };

  const deleteItem = (items, setItems, index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const setItemsByTab = (items) => {
    if (tabIndex === 0) setLunchItems(items);
    if (tabIndex === 1) setDinnerItems(items);
    if (tabIndex === 2) setBreakfastItems(items);
  };

  const handleDeleteItem = (index) => {
    if (tabIndex === 0) deleteItem(lunchItems, setLunchItems, index);
    if (tabIndex === 1) deleteItem(dinnerItems, setDinnerItems, index);
    if (tabIndex === 2) deleteItem(breakfastItems, setBreakfastItems, index);
  };

  const getCurrentItems = (index = tabIndex) => {
    if (index === 0) return lunchItems;
    if (index === 1) return dinnerItems;
    if (index === 2) return breakfastItems;
    return []; // Default case, should not be reached
  };

  // Function to format date as required
  const formatDate = (date) => {
    const dt = new Date(date);
    dt.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00 UTC
    return dt.toISOString().split(".")[0]; // Return date in YYYY-MM-DDTHH:MM:SS format
  };

  const handleScheduleOrder = () => {
    // Ensure the endDate is in the format YYYY-MM-DD
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    const consolidatedOrder = {
      lunch: { items: lunchItems, time: lunchTime },
      dinner: { items: dinnerItems, time: dinnerTime },
      breakfast: { items: breakfastItems, time: breakfastTime },
      endDate: formattedEndDate,
    };

    fetch(
      `http://localhost/FoodDeliverySystems/api/Customer/CreateDailyScheduler?customer_id=${localStorage.getItem(
        "c_id"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consolidatedOrder),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error: Creating dailyscheduler", error);
      });

    console.log("Scheduled Order:", consolidatedOrder);

    setOpenDialog(true); // Open confirmation dialog
  };

  const handleConfirmScheduleOrder = () => {
    const formattedEndDate = formatDate(endDate); // Format the endDate
    const consolidatedOrder = {
      lunch: { items: lunchItems, time: lunchTime },
      dinner: { items: dinnerItems, time: dinnerTime },
      breakfast: { items: breakfastItems, time: breakfastTime },
      endDate: formattedEndDate, // Use formatted endDate
    };
    fetch(
      `http://localhost/FoodDeliverySystems/api/Customer/ConfirmDailyScheduler?customer_id=${localStorage.getItem(
        "c_id"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consolidatedOrder),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Scheduled Order:", consolidatedOrder);
    setOpenDialog(false); // Close the dialog
  };

  const handleCancelScheduleOrder = () => {
    console.log("Order scheduling canceled. Rolling back changes...");
    // Rollback logic if needed
    setOpenDialog(false); // Close the dialog
  };

  return (
    <>
      <Navbarcustomer />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Tabs value={tabIndex} onChange={handleChangeTab}>
          <Tab label="Lunch" />
          <Tab label="Dinner" />
          <Tab label="Breakfast" />
        </Tabs>
        <Box p={3}>
          <Typography variant="h5" component="div">
            {tabIndex === 0 && "Lunch Items"}
            {tabIndex === 1 && "Dinner Items"}
            {tabIndex === 2 && "Breakfast Items"}
          </Typography>
          {getCurrentItems().length > 0 ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      {" "}
                      <Box sx={{ marginTop: 3 }} className="d-flex ">
                        <Typography variant="body1" className="fs-4">
                          Select Time
                        </Typography>
                        <input
                          type="time"
                          value={
                            tabIndex === 0
                              ? lunchTime
                              : tabIndex === 1
                              ? dinnerTime
                              : breakfastTime
                          }
                          onChange={(e) => {
                            const time = e.target.value;
                            if (tabIndex === 0) setLunchTime(time);
                            if (tabIndex === 1) setDinnerTime(time);
                            if (tabIndex === 2) setBreakfastTime(time);
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ padding: "16px 24px", fontWeight: "bold" }}
                    >
                      Image
                    </TableCell>
                    <TableCell
                      sx={{ padding: "16px 24px", fontWeight: "bold" }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      sx={{ padding: "16px 24px", fontWeight: "bold" }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      sx={{ padding: "16px 24px", fontWeight: "bold" }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getCurrentItems().map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: "16px 24px" }}>
                        {item.Image}
                      </TableCell>
                      <TableCell sx={{ padding: "16px 24px" }}>
                        {item.Name}
                      </TableCell>
                      <TableCell sx={{ padding: "16px 24px" }}>
                        <Box display="flex" alignItems="center">
                          <Button
                            variant="contained"
                            onClick={() => decrementQuantity(index)}
                            sx={{
                              minWidth: "30px",
                              padding: 0,
                              marginRight: 1,
                              backgroundColor: "red",
                              color: "white",
                              "&:hover": { backgroundColor: "darkred" },
                            }}
                          >
                            -
                          </Button>
                          <Typography
                            variant="body1"
                            sx={{
                              marginX: 1,
                              minWidth: "30px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => incrementQuantity(index)}
                            sx={{
                              minWidth: "30px",
                              padding: 0,
                              marginLeft: 1,
                              backgroundColor: "red",
                              color: "white",
                              "&:hover": { backgroundColor: "darkred" },
                            }}
                          >
                            +
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: "16px 24px" }}>
                        <Button
                          variant="contained"
                          onClick={() => handleDeleteItem(index)}
                          sx={{
                            backgroundColor: "red",
                            color: "white",
                            "&:hover": { backgroundColor: "darkred" },
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <Typography variant="body1">
              No items found for this category.
            </Typography>
          )}
          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <label className="mx-4 fs-5 ">End Date </label>
            <input
              type="date"
              className="mx-2 fs-5 border border-1 border-danger bg-danger text-white rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Box>
          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              onClick={handleScheduleOrder}
              sx={{
                backgroundColor: "red",
                color: "white",
                padding: "12px 24px",
                "&:hover": { backgroundColor: "darkred" },
              }}
            >
              Schedule Order
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Scheduling</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to schedule your order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmScheduleOrder} color="primary">
            Yes
          </Button>
          <Button onClick={handleCancelScheduleOrder} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
