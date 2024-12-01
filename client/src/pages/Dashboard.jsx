import React from "react";
import BasicPie from "../components/pieChart";
import BasicScatter from "../components/scatter";
import PaymentButton from "../components/button";
import CardSection from "../components/dashBoardCards";

import { Box } from "@mui/material";

export default function Dashboard() {
  const handlePayment = () => {
    console.log("Payment button clicked");
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <h1>Dashboard</h1>

      <div
        className="dashboard-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "0 5%",
        }}
      >
        {/* Card Section */}
        <div className="card-section" style={{ width: "40%" }}>
          <CardSection title="User's Balance" content="$1000" />
          <CardSection
            title="Recent Activity"
            listItems={[
              "Purchase at Store A - $50",
              "Purchase at Store B - $30",
              "Purchase at Store C - $20",
              "Purchase at Store D - $10",
              "Purchase at Store E - $70",
              "Purchase at Store F - $25",
            ]}
          />
        </div>

        {/* Charts Section */}
        <div className="charts-section" style={{ width: "55%" }}>
          <BasicPie />
          <BasicScatter />
        </div>
      </div>

      {/* Payment Button*/}
      {/* <div
        className="payment-button-container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <PaymentButton onClick={handlePayment}>Pay Now</PaymentButton>
      </div> */}
    </Box>
  );
}
