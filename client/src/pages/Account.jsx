/* eslint-disable no-unused-vars */
import React from "react";

import { Typography, Box } from "@mui/material";

import PageTitle from "../components/PageTitle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export default function Account() {
  return (
    <Box>
      <PageTitle title="Account" icon={<ManageAccountsIcon />} />
    </Box>
  );
}
