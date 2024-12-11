/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Typography, Box, Grid2, Stack } from "@mui/material";
import PageTitle from "../components/PageTitle";
import LoadingPage from "../components/LoadingPage";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountInfoCard from "../components/Account/AccountInfoCard";
import AccountActionButton from "../components/Account/AccountActionButton";
import AccountSpendingLimitForm from "../components/Account/AccountSpendingLimitForm";
import AccountSpendingLimitCard from "../components/Account/AccountSpendingLimitCard";
import { fetchUser, updateSpendingLimit } from "../api/accounts";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";

export default function Account() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [openSpendingLimitDialog, setOpenSpendingLimitDialog] = useState(false);

  const currentHandler = localStorage.getItem("handler");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser(currentHandler);
        setUser(userData[0]);
        console.log(userData);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdateSpendingLimit = async (newLimit) => {
    try {
      await updateSpendingLimit(currentHandler, newLimit);
      setUser((prevUser) => ({
        ...prevUser,
        spendingLimit: newLimit,
      }));
      setOpenSpendingLimitDialog(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  if (loading || error) {
    return <LoadingPage />;
  }

  return (
    <Box>
      <PageTitle title="Account" icon={<ManageAccountsIcon />} />
      <Grid2 container spacing={3} sx={{ m: 4 }}>
        {/* User info */}
        <Grid2 size={3}>
          <Stack spacing={2}>
            <AccountInfoCard user={user} />
            <AccountBalanceCard
              balance={user.balance}
              sx={{ borderRadius: 3 }}
            />
            <AccountSpendingLimitCard limit={user.spending_limit} />
          </Stack>
        </Grid2>
        {/* Buttons */}
        <Grid2 size={3}>
          <AccountActionButton
            text="Update Spending Limit"
            icon={<ManageAccountsIcon sx={{ fontSize: 35 }} />}
            onClick={() => setOpenSpendingLimitDialog(true)}
          />
        </Grid2>
      </Grid2>
      <AccountSpendingLimitForm
        open={openSpendingLimitDialog}
        handleClose={() => setOpenSpendingLimitDialog(false)}
        onUpdate={handleUpdateSpendingLimit}
      />
    </Box>
  );
}
