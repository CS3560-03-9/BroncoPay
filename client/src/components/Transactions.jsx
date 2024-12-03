import React, { useState, useEffect } from "react";
import PaymentButton from "../components/button";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import InputIcon from "@mui/icons-material/Input";
import { fetchUser } from "../api/accounts";
import { fetchActivity } from "../api/transactions";

import PageTitle from "../components/PageTitle";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import AccountRecentActivity from "../components/Account/AccountRecentActivity";

const PaymentComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    handler: "",
    email: "",
    account_type: "",
    balance: 0,
    spending_limit: 0,
    creation: "",
  });
  const [activity, setActivity] = useState([]);
  const [step, setStep] = useState(1);

  const tempData = {
    user: "test2",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser(tempData.user);
        setUser(user);

        const transactions = await fetchActivity(tempData.user);
        setActivity(transactions);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || error) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleDepositMoney = () => {
    console.log("Deposit Money")
    //TODO: handle successful deposit
  };

  return (
    <Box>
      {/* Deposit Money */}
      <Card
        sx={{
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          mt: "2.5%",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            <InputIcon sx={{ fontSize: 35 }} />
            Make a Deposit
          </Typography>

          <Card>
            {/* FIRST STEP */}
            {step === 1 && (
              <CardContent>
                <Typography variant="h5" textAlign="left">
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
                <Typography variant="h5" textAlign="left">
                  Payment Information
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Expiry Date"
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

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              {/* Back Button */}
              <PaymentButton onClick={handleBack} label="Back" />

              {/* Next/Deposit Button */}
              {step === 1 && (
                <PaymentButton onClick={handleNext} label="Next" />
              )}
              {step === 2 && (
                <PaymentButton
                  onClick={handleDepositMoney}
                  label="Deposit Money"
                />
              )}
            </div>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentComponent;
