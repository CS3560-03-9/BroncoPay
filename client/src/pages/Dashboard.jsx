import React, { useState, useEffect } from "react";
import CardSection from "../components/dashBoardCards";
import { fetchUser } from "../api/accounts";
import { fetchActivity } from "../api/transactions";

import { Box, CircularProgress, Grid2 } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PageTitle from "../components/PageTitle";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import AccountRecentActivity from "../components/Account/AccountRecentActivity";
import DashboardTransactionHistory from "../components/Dashboard/DashboardTransactionHistory";

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
      <Grid2 container spacing={3} columns={20} sx={{ m: 5 }}>
        {/* Account balance */}
        <Grid2 item size={4}>
          <AccountBalanceCard balance={user.balance} sx={{}} />
        </Grid2>

        {/* Transaction history table */}
        <Grid2 item size={16}>
          <DashboardTransactionHistory entries={activity} sx={{}} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
