/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';

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
// handleConfirm callback will return object 'data' = { amount: float, recipient: string, description: string }
export default function PaymentCard({
  title,
  icon,
  handleConfirm,
  transaction_type,
  sx,
}) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState(""); // optional
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [cvvValue, setCvvValue] = useState("");

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

  // used for TRANSACTION (transaction_type)
  const confirmTransaction = () => {
    const data = {
      amount: parseFloat(amount),
      recipient: transaction_type === "TRANSACTION" ? recipient : null,
      description,
    };
    handleConfirm(data);
    handleNext();
  };



  const handleCardNum = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    
    setCardNum(value);
  };

  return (
    <Card sx={{ ...sx }} raised>
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
                id="amount-input"
                label="Amount ($)"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{ //I know it says its depreciated, but it wasn't working otherwise
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onKeyDown={(e) => {
                if (
                  !(  //allow keys
                    (e.key >= "0" && e.key <= "9") ||
                    e.key === "." ||
                    e.key === "Backspace" ||
                    e.key === "Tab" ||
                    e.key === "Delete" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Enter"
                  )
                  ) { //prevent all other keys
                    e.preventDefault();
                  }
               }}
              />
              {transaction_type === "TRANSACTION" && (
                <TextField
                  id="username-input"
                  label="Recipient Username"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              )}
              <TextField
                id="description-input"
                label="Description (Optional)"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                inputProps={{ maxLength: 19 }} // 16 digits + 3 spaces (optional)
                value={cardNum}
                onChange={handleCardNum}
                onKeyDown={(e) => {
                if (
                  !(  //allow keys
                    (e.key >= "0" && e.key <= "9") ||
                    e.key === "Backspace" ||
                    e.key === "Tab" ||
                    e.key === "Delete" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Enter" ||
                    e.key === " "
                  )
                  ) { //prevent all other keys
                    e.preventDefault();
                  }
               }}
              />
              <TextField
                id="outlined-basic"
                label="Expiration Date"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 5 }} // MM/YY
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    !(  //allow keys
                      (e.key >= "0" && e.key <= "9") ||
                      e.key === "Backspace" ||
                      e.key === "Tab" ||
                      e.key === "Delete" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight" ||
                      e.key === "Enter" ||
                      e.key === "/"
                    )
                    ) { //prevent all other keys
                      e.preventDefault();
                    }
                 }}
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 3 }}
                value={cvvValue}
                onChange={(e) => setCvvValue(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    !(  //allow keys
                      (e.key >= "0" && e.key <= "9") ||
                      e.key === "Backspace" ||
                      e.key === "Tab" ||
                      e.key === "Delete" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight" ||
                      e.key === "Enter"
                    )
                    ) { //prevent all other keys
                      e.preventDefault();
                    }
                 }}
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
              <Button variant="outlined" onClick={confirmTransaction}>
                Confirm
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}
