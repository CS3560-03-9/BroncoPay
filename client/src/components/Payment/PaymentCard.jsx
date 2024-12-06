/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";

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
  const [amount, setAmount] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState(""); // optional
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [cvvValue, setCvvValue] = useState("");
  const [errors, setErrors] = useState({
    amount: "",
    cardNum: "",
    date: "",
    cvvValue: "",
  });

  const validateInputs = () => {
    const newErrors = {
      amount: "",
      cardNum: "",
      date: "",
      cvvValue: "",
    };

    // Validate amount
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount.";
    }

    // Validate card number
    if (cardNum.replace(/\s/g, "").length !== 16) {
      newErrors.cardNum = "Card number must be 16 digits.";
    }

    // Validate expiration date
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(date)) {
      newErrors.date = "Expiration date must be in MM/YY format.";
    }

    // Validate CVV
    if (cvvValue.length !== 3 || isNaN(cvvValue)) {
      newErrors.cvvValue = "CVV must be 3 digits.";
    }

    setErrors(newErrors);

    // Return whether the inputs are valid
    return Object.values(newErrors).every((error) => error === "");
  };

  const cleanErrors = (value) => {
    // card number
    if (value.replace(/\s/g, "").length === 16) {
      setErrors((prevErrors) => ({ ...prevErrors, cardNum: "" }));
    }

    // expiration date
    if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, date: "" }));
    }

    // cvv
    if (value.length === 3) {
      setErrors((prevErrors) => ({ ...prevErrors, cvvValue: "" }));
    }
  };

  const handleNext = () => {
    if (transaction_type === "TRANSACTION" && step === 1) {
      const data = {
        amount: parseFloat(amount),
        recipient: transaction_type === "TRANSACTION" ? recipient : null,
        description,
      };
      handleConfirm(data);
      setStep(3);
      return;
    }
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
    if (!validateInputs()) return;

    const data = {
      amount: parseFloat(amount),
      recipient: transaction_type === "TRANSACTION" ? recipient : null,
      description,
    };
    handleConfirm(data);
    handleNext();
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
                placholder="0"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{
                  //I know it says its depreciated, but it wasn't working otherwise
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onKeyDown={(e) => {
                  if (
                    !(
                      //allow keys
                      (
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "." ||
                        e.key === "Backspace" ||
                        e.key === "Tab" ||
                        e.key === "Delete" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight" ||
                        e.key === "Enter"
                      )
                    )
                  ) {
                    //prevent all other keys
                    e.preventDefault();
                  }
                }}
                error={!!errors.amount}
                helperText={errors.amount}
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
          {step === 2 && transaction_type !== "TRANSACTION" && (
            <Box>
              <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
                Payment Information
              </Typography>
              <TextField
                id="outlined-basic"
                label="Card Number"
                placeholder="0000 0000 0000 0000"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 19 }} // 16 digits + 3 spaces
                value={cardNum}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  value = value.substring(0, 16);
                  value = value.replace(/(.{4})/g, "$1 ").trim(); // space every 4 digits
                  setCardNum(value);
                  cleanErrors(value);
                }}
                onKeyDown={(e) => {
                  if (
                    !(
                      //allow keys
                      (
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab" ||
                        e.key === "Delete" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight" ||
                        e.key === "Enter"
                      )
                    )
                  ) {
                    //prevent all other keys
                    e.preventDefault();
                  }
                }}
                onBlur={() => {
                  if (cardNum.replace(/\s/g, "").length !== 16) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      cardNum: "Card number must be 16 digits.",
                    }));
                  }
                }}
                error={!!errors.cardNum}
                helperText={errors.cardNum}
              />
              <TextField
                id="outlined-basic"
                label="Expiration Date"
                placeholder="MM/YY"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 5 }} // MM/YY
                value={date}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 2) {
                    value = value.substring(0, 2) + "/" + value.substring(2, 4); // slash after MM (automatic)
                  }
                  value = value.substring(0, 5);
                  setDate(value);
                  cleanErrors(value);
                }}
                onKeyDown={(e) => {
                  if (
                    !(
                      //allow keys
                      (
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab" ||
                        e.key === "Delete" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight" ||
                        e.key === "Enter"
                      )
                    )
                  ) {
                    //prevent all other keys
                    e.preventDefault();
                  }
                }}
                onBlur={() => {
                  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(date)) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      date: "Expiration date must be in MM/YY format.",
                    }));
                  }
                }}
                error={!!errors.date}
                helperText={errors.date}
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                placeholder="XXX"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 3 }}
                value={cvvValue}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCvvValue(value);
                  cleanErrors(value);
                }}
                onKeyDown={(e) => {
                  if (
                    !(
                      //allow keys
                      (
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Tab" ||
                        e.key === "Delete" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight" ||
                        e.key === "Enter"
                      )
                    )
                  ) {
                    //prevent all other keys
                    e.preventDefault();
                  }
                }}
                onBlur={() => {
                  if (cvvValue.length !== 3) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      cvvValue: "CVV must be 3 digits.",
                    }));
                  }
                }}
                error={!!errors.cvvValue}
                helperText={errors.cvvValue}
              />
            </Box>
          )}

          {/* THIRD STEP */}
          {/* Transaction Types: DEPOSIT, WITHDRAW, TRANSACTION */}
          {step === 3 && (
            <PaymentConfirmationForm
              type={transaction_type}
              balance={amount}
              recipient={recipient}
            />
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
