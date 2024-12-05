/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { Box, Grid2, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import PageTitle from "../components/PageTitle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LoadingPage from "../components/LoadingPage";
import BusinessWithdrawForm from "../components/Business/BusinessWithdrawForm";

import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import BusinessActionButton from "../components/Business/BusinessActionButton";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { fetchPledges } from "../api/pledges";
import { fetchUser } from "../api/accounts";
import { withdrawMoney } from "../api/transactions";

export default function Business() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);
  const [pledges, setPledges] = useState([]);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false); // Withdraw dialog

  const tempData = {
    user: "test3", // test3 and test4 are the only businesses in the system
    // no other user should be able to see this page
  };

  const PLEDGES_COLUMNS = [
    { field: "pledge_id", headerName: "ID", width: 90 },
    { field: "handler", headerName: "Business", width: 150 },
    { field: "cost", headerName: "Cost", width: 150 },
    { field: "pledge_interval", headerName: "Interval", width: 150 },
    { field: "pledge_desc", headerName: "Description", width: 500 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser(tempData.user);
        const pledges = await fetchPledges(tempData.user);

        setUser(user[0]);
        setPledges(pledges);
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

  const handleWithdraw = async (data) => {
    const { amount, description } = data;
    try {
      await withdrawMoney(tempData.user, amount, description);
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  if (loading || error) {
    return <LoadingPage />;
  }

  return (
    <Box>
      <PageTitle title="Business" icon={<BusinessCenterIcon />} />
      <Grid2 container spacing={3} sx={{ m: 4 }}>
        <Grid2 size={3}>
          <Stack spacing={2}>
            {/* Account balance */}
            <AccountBalanceCard balance={user.balance} />

            <Grid2 container spacing={2}>
              {/* Create new pledge */}
              <Grid2 size={6}>
                <BusinessActionButton
                  text={"New Pledge"}
                  icon={<CurrencyExchangeIcon sx={{ fontSize: 40 }} />}
                />
              </Grid2>

              {/* Withdraw from business balance */}
              <Grid2 size={6}>
                <BusinessActionButton
                  text={"Withdraw"}
                  icon={<LocalAtmIcon sx={{ fontSize: 40 }} />}
                  onClick={() => setWithdrawDialogOpen(true)}
                />
              </Grid2>
            </Grid2>
            {/* filler buttons */}
            {/* <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <BusinessActionButton text={"test"} icon={"?"} />
              </Grid2>

              <Grid2 size={6}>
                <BusinessActionButton text={"filler"} icon={"?"} />
              </Grid2>
            </Grid2> */}
          </Stack>
        </Grid2>
        <Grid2 size={9}>
          <DataGrid
            rows={pledges}
            columns={PLEDGES_COLUMNS}
            getRowId={(row) => row?.pledge_id}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{ height: 600 }}
          />
        </Grid2>
      </Grid2>

      {/* Popup form for withdrawing */}
      <BusinessWithdrawForm
        open={withdrawDialogOpen}
        handleClose={() => setWithdrawDialogOpen(false)}
        user={user}
        onWithdraw={handleWithdraw}
      />
    </Box>
  );
}
