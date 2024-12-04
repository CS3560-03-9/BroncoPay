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

import InputIcon from "@mui/icons-material/Input";
import PaymentConfirmationForm from "./PaymentConfirmationForm";

import { depositMoney } from "../../api/transactions";

export default function PaymentCard() {
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

  const handleDepositMoney = (handler) => {
    try {
      depositMoney(handler);
      handleNext();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ mx: -8 }} raised>
      <Box sx={{ p: 4 }}>
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
          {step === 3 && (
            <PaymentConfirmationForm type="DEPOSIT" balance={amount} />
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
              <Button variant="outlined" onClick={handleDepositMoney}>
                Deposit Money
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}
