// eslint-disable-next-line no-unused-vars
import React from "react";
import BasicPie from "../components/pieChart";
import BasicScatter from "../components/scatter";





export default function Dashboard() {
  return (
    <>
    <div>
      <h1>Dashboard</h1>
    </div>
    <div id="charts">
      <BasicPie></BasicPie>
      <BasicScatter></BasicScatter>
    </div>
    </>
  );
}
