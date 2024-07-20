const handleAddNewItem = (props) => {
  setSchedule((prev) => {
    const newSchedule = prev.map((daySchedule, dIndex) =>
      daySchedule.map((mealSchedule, mIndex) =>
        dIndex === selectedDay && mIndex === selectedMeal
          ? {
              ...mealSchedule,
              items: [
                ...mealSchedule.items,
                {
                  food: props.foodname,
                  quantity: props.quantity,
                  status: "Active",
                },
              ],
            }
          : mealSchedule
      )
    );
    return newSchedule;
  });
};
