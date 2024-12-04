import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PaymentConfirmationForm({ type, balance, recipient }) {
  let title = "";
  let description = "";

  if (type === "DEPOSIT") {
    title = "Deposit confirmed.";
    description = `You have successfully deposited $${balance}.`;
  } else if (type === "WITHDRAW") {
    title = "Withdrawal confirmed.";
    description = `You have successfully withdrawn $${balance}.`;
  } else if (type === "TRANSACTION") {
    title = "Transaction confirmed.";
    description = `You have successfully transferred $${balance} to ${recipient}.`;
  } else {
    // ** TO DO Update this to handle subscription payments or bills or whatever
    title = "Payment confirmed.";
    description = `Your payment has been confirmed. Thank you for your purchase!`;
  }

  return (
    <Stack
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" textAlign="left" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" textAlign="left" sx={{ mb: 2 }}>
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}
