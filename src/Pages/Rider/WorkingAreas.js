import React from "react";
import { Navbar } from "../../Components/Navbar";
import GoogleMap from "./component/GoogleMap";
import TextInputddp from "./component/TextInputddp";
import ZoneItemList from "./component/ZoneItemList";
import { MyWorkingZones } from "./component/WorkingAreasHeading";
export const WorkingAreas = () => {
  return (
    <>
      <Navbar />
      <TextInputddp />
      <GoogleMap />
      <MyWorkingZones />
      <ZoneItemList />
    </>
  );
};
