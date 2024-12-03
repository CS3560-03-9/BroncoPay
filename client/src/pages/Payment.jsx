import React, { useState, useEffect } from "react";
import PaymentButton from "../components/button";
import { Card, CardContent, Typography, Box, CircularProgress, Grid2, TextField} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import InputIcon from '@mui/icons-material/Input';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

import { fetchUser } from "../api/accounts";
import { fetchActivity } from "../api/transactions";

import PageTitle from "../components/PageTitle";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import AccountRecentActivity from "../components/Account/AccountRecentActivity";
import PaymentComponent from "../components/Transactions";

export default function Payment() {
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
  const [step, setStep] = useState(1);

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
      <PageTitle title="Payments" icon={<PaymentIcon fontSize="large" />} />

      {/* Parent Grid */}
      <Grid2 container spacing={10} columns={15} sx={{ m: 5, display: "flex"}}>
        {/* Account Balance */}
        <Grid2 item size={4}>
          <AccountBalanceCard balance={user.balance} sx={{ mt: 3 }} />
          <AccountRecentActivity sx={{ mt: 3 }} listItems={activity} />
        </Grid2>

        {/* Transactions Component */}
        <Grid2 item size ={8} sx={{marginLeft: "10%", marginRight: "10%"}}>
          <PaymentComponent/> 
        </Grid2>
      </Grid2> 
    </Box>
  );
}
