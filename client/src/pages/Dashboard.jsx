/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchUser } from "../api/accounts";
import { fetchActivity } from "../api/transactions";
import { fetchSubscriptions } from "../api/subscriptions";

import { Box, Grid2, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PageTitle from "../components/PageTitle";
import LoadingPage from "../components/LoadingPage";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import DashboardTransactionHistory from "../components/Dashboard/DashboardTransactionHistory";
import DashboardMonthlySpending from "../components/Dashboard/DashboardMonthlySpending";
import DashboardSpendingLimit from "../components/Dashboard/DashboardSpendingLimit";
import DashboardMonthlyBill from "../components/Dashboard/DashboardMonthlyBill";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    handler: "",
    email: "",
    balance: 0,
    spending_limit: 0,
  });
  const [activity, setActivity] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const tempData = {
    user: "test3",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser(tempData.user);
        setUser(user[0] || {});

        const transactions = await fetchActivity(tempData.user);
        setActivity(transactions);

        const subscriptions = await fetchSubscriptions(tempData.user);
        setSubscriptions(subscriptions);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || error) {
    return <LoadingPage />;
  }

  return (
    <Box>
      <PageTitle
        title={"Dashboard"}
        icon={<DashboardIcon fontSize="large" />}
      />
      <Grid2 container spacing={3} columns={20} sx={{ m: 5 }}>
        {/* Account balance */}
        <Grid2 size={4}>
          <Stack spacing={3}>
            <AccountBalanceCard balance={user?.balance || 0} />
            <DashboardMonthlySpending balance={user?.monthly_spent} />
            <DashboardSpendingLimit
              balance={user?.monthly_spent}
              limit={user?.spending_limit || 0}
            />
            <DashboardMonthlyBill subscriptions={subscriptions} />
          </Stack>
        </Grid2>

        {/* Transaction history table */}
        <Grid2 size={16}>
          <DashboardTransactionHistory
            entries={activity}
            user={tempData.user}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
