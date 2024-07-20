import React from "react";
import { Navbar } from "../../Components/Navbar";
import { HistoryHeader } from "./component/HistoryHeader";
import HistoryCard from "./component/HistoryCard";
import Sidebar from "./component/Sidebar";

export default function History() {
  return (
    <>
      <Navbar toggle={0} />
      {global.toggle === 1 && <Sidebar />} {/* Conditionally render Sidebar */}
      <HistoryHeader />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </>
  );
}
