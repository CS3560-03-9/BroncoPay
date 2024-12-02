import React, { useState, useEffect } from "react";
import CardSection from "../components/dashBoardCards";
import { fetchUser } from "../api/accounts";
import { fetchActivity } from "../api/transactions";

import { Box, CircularProgress } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PageTitle from "../components/PageTitle";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import AccountRecentActivity from "../components/Account/AccountRecentActivity";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    handler: "",
    email: "",
    account_type: "",
    balance: 0,
    spending_limit: 0,
    creation: "",
  });
  const [activity, setActivity] = useState([]);

  const tempData = {
    user: "test2",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser(tempData.user);
        setUser(user);

        const transactions = await fetchActivity(tempData.user);
        setActivity(transactions);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePayment = () => {
    console.log("Payment button clicked");
  };

  if (loading || error) {
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
          <AccountBalanceCard balance={user.balance} sx={{ mt: 3 }} />
          <AccountRecentActivity sx={{ mt: 3 }} listItems={activity} />
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
