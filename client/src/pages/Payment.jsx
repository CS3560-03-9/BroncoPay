import React, { useState, useEffect } from "react";
import PaymentButton from "../components/button";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

import { fetchUser } from "../api/accounts";
import { fetchActivity } from "../api/transactions";

import PageTitle from "../components/PageTitle";
import AccountBalanceCard from "../components/Account/AccountBalanceCard";
import AccountRecentActivity from "../components/Account/AccountRecentActivity";

export default function Payment() {
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
  const handleDepositMoney = () => {
    console.log("Deposit Money button clicked");
    //TODO: handle deposit money
  };

  const handleSetUpRecurringPayments = () => {
    console.log("Set Up Recurring Payments button clicked");
    //TODO: handle recurring payments
  };

  return (
    <Box>
      <PageTitle title="Payments" icon={<PaymentIcon fontSize="large" />} />
      {/* Main div Styling */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "0px",
          flexWrap: "wrap",
        }}
      >
        {/* Balance & Recent Transactions */}
        <div
          className="card-section"
          style={{ width: "30%", padding: "0", marginLeft: "5%" }}
        >
          <AccountBalanceCard balance={user.balance} sx={{ mt: 3 }} />
          <AccountRecentActivity sx={{ mt: 3 }} listItems={activity} />
        </div>

        {/* Make a Payment */}
        <Card
          sx={{
            width: "30%",
            padding: 0,
            marginTop: "2%",
            boxShadow: "0 10px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Make a Payment
            </Typography>
            <Card
              sx={{
                width: "100%",
                padding: 0,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                marginBottom: 2,
                margin: "0 auto",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ marginBottom: 2 }}
                >
                  Enter Amount
                </Typography>
                <input
                  type="number"
                  step="0.01"
                  placeholder="$0.00"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    paddingBottom: "20px",
                  }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <PaymentButton
                    onClick={() => console.log("Cancel button clicked")}
                    label="Cancel"
                  />
                  <PaymentButton
                    onClick={() => console.log("Next button clicked")}
                    label="Next"
                  />
                </div>

                <PaymentButton
                  onClick={handleDepositMoney}
                  label="Deposit Money"
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Recurring Payments Card */}
        <Card
          sx={{
            width: "30%",
            padding: 0,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            marginTop: "2%",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Set Up Recurring Payments
            </Typography>

            <Card
              sx={{
                width: "100%",
                padding: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                marginBottom: 2,
                margin: "0 auto",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ marginBottom: 2 }}
                >
                  Enter Amount
                </Typography>
                <input
                  type="number"
                  step="0.01"
                  placeholder="$0.00"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "20px",
                  }}
                >
                  <PaymentButton
                    onClick={() => console.log("Cancel button clicked")}
                    label="Cancel"
                  />
                  <PaymentButton
                    onClick={() => console.log("Next button clicked")}
                    label="Next"
                  />
                </div>

                {/* Recurring Payment Button */}
                <PaymentButton
                  onClick={handleSetUpRecurringPayments}
                  label="Set Up Recurring Payments"
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}
