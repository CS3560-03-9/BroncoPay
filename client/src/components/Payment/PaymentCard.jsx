/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  CardContent,
  Typography,
  TextField,
  Card,
  Button,
  Box,
  Stack,
  Divider,
} from "@mui/material";

import PaymentConfirmationForm from "./PaymentConfirmationForm";

import { depositMoney } from "../../api/transactions";

// Transaction Types: DEPOSIT, WITHDRAW, TRANSACTION
// Make icon fontSize: 35
export default function PaymentCard({
  title,
  icon,
  handleConfirm,
  transaction_type,
}) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      return;
    }

    // confirmation page
    if (step === 3) {
      window.location.reload();
      return;
    }

    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Card sx={{ mx: -8 }} raised>
      <Box sx={{ p: 4 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ my: 3, alignItems: "center", justifyContent: "center" }}
        >
          {icon}
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </Stack>
        <Divider variant="middle" sx={{ mb: 2 }} />

        <Box sx={{ p: 2 }}>
          {/* FIRST STEP */}
          {step === 1 && (
            <Box>
              <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
                Enter Amount
              </Typography>
              <TextField
                id="outlined-basic"
                label="$0.00"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Box>
          )}

          {/* SECOND STEP */}
          {step === 2 && (
            <Box>
              <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
                Payment Information
              </Typography>
              <TextField
                id="outlined-basic"
                label="0000 0000 0000 0000"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="outlined-basic"
                label="Expiration Date"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Box>
          )}

          {/* THIRD STEP */}
          {/* Transaction Types: DEPOSIT, WITHDRAW, TRANSACTION */}
          {step === 3 && (
            <PaymentConfirmationForm type={transaction_type} balance={amount} />
          )}

          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Page 1: Deposit Money */}
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            {step === 1 && (
              <Button variant="outlined" onClick={handleNext}>
                Next
              </Button>
            )}

            {/* Page 2: Payment Information */}
            {step === 2 && (
              <Button
                variant="outlined"
                onClick={() => {
                  handleConfirm;
                  handleNext();
                }}
              >
                Confirm
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}
