/* eslint-disable no-unused-vars */
import React from "react";

import { Box } from "@mui/material";

import PageTitle from "../components/PageTitle";
import SellIcon from "@mui/icons-material/Sell";

export default function Subscriptions() {
  return (
    <Box>
      <PageTitle title="Subscriptions" icon={<SellIcon fontSize="large" />} />
    </Box>
  );
}
