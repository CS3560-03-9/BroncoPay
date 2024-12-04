// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import InputIcon from "@mui/icons-material/Input";

import { fetchUser } from "../api/accounts";
import { fetchActivity, depositMoney } from "../api/transactions";

import PageTitle from "../components/PageTitle";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import AccountRecentActivity from "../components/Account/AccountRecentActivity";
import LoadingPage from "../components/LoadingPage";

import PaymentCard from "../components/Payment/PaymentCard";

export default function Payment() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    handler: "",
    email: "",
    balance: 0,
    spending_limit: 0,
  });
  const [activity, setActivity] = useState([]);

  const tempData = {
    user: "test2",
  };

  const handleDepositMoney = (handler) => {
    try {
      depositMoney(handler);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser(tempData.user);
        setUser(user[0]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || error) {
    return <LoadingPage />;
  }

  return (
    <Box>
      <PageTitle title="Payments" icon={<PaymentIcon fontSize="large" />} />

      {/* Parent Grid */}
      <Grid2 container spacing={10} columns={15} sx={{ m: 5, display: "flex" }}>
        {/* Account Balance */}
        <Grid2 size={4}>
          <AccountBalanceCard balance={user?.balance} />
          <AccountRecentActivity sx={{ mt: 3 }} listItems={activity} />
        </Grid2>

        {/* Transactions Component */}
        <Grid2 size={8} sx={{ marginLeft: "10%", marginRight: "10%" }}>
          <PaymentCard
            title="Make a Deposit"
            icon={<InputIcon sx={{ fontSize: 35 }} />}
            handleConfirm={handleDepositMoney(user.handler)}
            transaction_type="DEPOSIT"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
