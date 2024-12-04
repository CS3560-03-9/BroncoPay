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
import { usePaymentInputs } from "react-payment-inputs";

import InputIcon from "@mui/icons-material/Input";

export default function PaymentCard() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleDepositMoney = (handler) => {
    handleDepositMoney(handler);
  };

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{ my: 3, alignItems: "center", justifyContent: "center" }}
        >
          <InputIcon sx={{ fontSize: 35 }} />
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Make a Deposit
          </Typography>
        </Stack>
        <Divider variant="middle" sx={{ mb: 2 }} />

        <Card sx={{ p: 2 }}>
          {/* FIRST STEP */}
          {step === 1 && (
            <CardContent>
              <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
                Enter Amount
              </Typography>
              <TextField
                id="outlined-basic"
                label="$0.00"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            </CardContent>
          )}

          {/* SECOND STEP */}
          {step === 2 && (
            <CardContent>
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
            </CardContent>
          )}

          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              pb: 2,
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
              <Button variant="outlined" onClick={handleDepositMoney}>
                Deposit Money
              </Button>
            )}
          </Stack>
        </Card>
      </CardContent>
    </Card>
  );
}
