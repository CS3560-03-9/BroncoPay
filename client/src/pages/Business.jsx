import React from "react";

import { Box, Typography } from "@mui/material";

import PageTitle from "../components/PageTitle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

export default function Business() {
  return (
    <Box>
      <PageTitle title="Business" icon={<BusinessCenterIcon />} />
    </Box>
  );
}
