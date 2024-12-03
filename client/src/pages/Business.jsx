/* eslint-disable no-unused-vars */
import React from "react";

import { Box, Grid2, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import PageTitle from "../components/PageTitle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import BusinessActionButton from "../components/Business/BusinessActionButton";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export default function Business() {
  const PLEDGES_COLUMNS = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "pledge", headerName: "Pledge", width: 150 },
    { field: "cost", headerName: "Cost", width: 150 },
    { field: "interval", headerName: "Interval", width: 150 },
    { field: "description", headerName: "Description", width: 500 },
  ];

  const TEST_ROWS = [
    {
      id: 1,
      pledge: "Pledge 1",
      cost: 100,
      interval: "Monthly",
      description: "Description 1",
    },
    {
      id: 2,
      pledge: "Pledge 2",
      cost: 200,
      interval: "Monthly",
      description: "Description 2",
    },
    {
      id: 3,
      pledge: "Pledge 3",
      cost: 300,
      interval: "Monthly",
      description: "Description 3",
    },
    {
      id: 4,
      pledge: "Pledge 4",
      cost: 400,
      interval: "Monthly",
      description: "Description 4",
    },
    {
      id: 5,
      pledge: "Pledge 5",
      cost: 500,
      interval: "Monthly",
      description: "Description 5",
    },
  ];

  const navigate = useNavigate();

  return (
    <Box>
      <PageTitle title="Business" icon={<BusinessCenterIcon />} />
      <Grid2 container spacing={3} sx={{ m: 4 }}>
        <Grid2 item size={3}>
          <Stack spacing={2}>
            {/* Account balance */}
            <AccountBalanceCard />

            <Grid2 container spacing={2}>
              {/* Create new pledge */}
              <Grid2 item size={6}>
                <BusinessActionButton
                  text={"New Pledge"}
                  icon={<CurrencyExchangeIcon sx={{ fontSize: 40 }} />}
                />
              </Grid2>

              {/* Withdraw from business balance */}
              <Grid2 item size={6}>
                <BusinessActionButton
                  text={"Withdraw"}
                  icon={<LocalAtmIcon sx={{ fontSize: 40 }} />}
                  onClick={() => navigate("/business/withdraw")}
                />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
              {/* Create new pledge */}
              <Grid2 item size={6}>
                <BusinessActionButton text={"filler"} icon={"?"} />
              </Grid2>

              {/* Withdraw from business balance */}
              <Grid2 item size={6}>
                <BusinessActionButton text={"filler"} icon={"?"} />
              </Grid2>
            </Grid2>
          </Stack>
        </Grid2>
        <Grid2 item size={9}>
          <DataGrid
            rows={TEST_ROWS}
            columns={PLEDGES_COLUMNS}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
