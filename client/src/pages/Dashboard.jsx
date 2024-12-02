import React, { useState, useEffect } from "react";
import CardSection from "../components/dashBoardCards";
import { fetchUser } from "../api/accounts";

import { Box, CircularProgress, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PageTitle from "../components/PageTitle";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const tempData = {
    user: "test1",
  };

  useEffect(() => {
    fetchUser(tempData.user)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handlePayment = () => {
    console.log("Payment button clicked");
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <PageTitle
        title={"Dashboard"}
        icon={<DashboardIcon fontSize="large" />}
      />
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
          <CardSection
            title="User's Balance"
            content={`$${user.account.balance}`}
          />
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
        {/* <div className="charts-section" style={{ width: "55%" }}>
          <BasicPie />
          <BasicScatter />
        </div> */}
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
