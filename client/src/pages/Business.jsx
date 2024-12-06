/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { Box, Grid2, Stack, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import PageTitle from "../components/PageTitle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LoadingPage from "../components/LoadingPage";
import BusinessWithdrawForm from "../components/Business/BusinessWithdrawForm";

import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import BusinessActionButton from "../components/Business/BusinessActionButton";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { fetchPledges, createPledge } from "../api/pledges";
import { fetchUser } from "../api/accounts";
import { withdrawMoney } from "../api/transactions";
import BusinessNewPledgeForm from "../components/Business/BusinessNewPledgeForm";
import BusinessManagePledgePopup from "../components/Business/BusinessManagePledgePopup";

export default function Business() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);
  const [pledges, setPledges] = useState([]);
  const [selectedPledge, setSelectedPledge] = useState(null);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false); // Withdraw dialog
  const [pledgeDialogOpen, setPledgeDialogOpen] = useState(false); // New pledge dialog
  const [managePledgeDialogOpen, setManagePledgeDialog] = useState(false); // Manage pledge dialog

  const currentHandler = localStorage.getItem("handler");

  const PLEDGES_COLUMNS = [
    { field: "pledge_id", headerName: "ID", width: 90 },
    { field: "handler", headerName: "Business", width: 150 },
    { field: "cost", headerName: "Cost", width: 150 },
    { field: "pledge_interval", headerName: "Interval", width: 150 },
    {
      field: "pledge_desc",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flexGrow: 1,
              pr: 6,
            }}
          >
            {params.row.pledge_desc}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleManagePledge(params.row)}
            size="small"
            sx={{ mr: 3 }}
          >
            Manage
          </Button>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser(currentHandler);
        const pledges = await fetchPledges(currentHandler);

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
      await withdrawMoney(currentHandler, amount, description);
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  const handleCreatePledge = async (data) => {
    const { cost, interval, desc } = data;

    try {
      await createPledge(currentHandler, cost, interval, desc);
      window.location.reload();
    } catch (err) {
      console.error("Error creating pledge:", err);
    }
  };

  const handleManagePledge = (pledge) => {
    setManagePledgeDialog(true);
    setSelectedPledge(pledge);
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
                  onClick={() => setPledgeDialogOpen(true)}
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
            disableMultipleRowSelection
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

      {/* Popup form for creating a new pledge */}
      <BusinessNewPledgeForm
        open={pledgeDialogOpen}
        handleClose={() => setPledgeDialogOpen(false)}
        onCreatePledge={handleCreatePledge}
      />

      {/* Popup for managing a pledge */}
      <BusinessManagePledgePopup
        open={managePledgeDialogOpen}
        handleClose={() => setManagePledgeDialog(false)}
        pledge={selectedPledge}
      />
    </Box>
  );
}
