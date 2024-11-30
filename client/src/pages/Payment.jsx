import React from "react";
import PaymentButton from "../components/button";
import { Card, CardContent, Typography } from "@mui/material";

export default function Payment() {
  const handleDepositMoney = () => {
    console.log("Deposit Money button clicked");
    // Add logic to handle deposit money
  };

  const handleSetUpRecurringPayments = () => {
    console.log("Set Up Recurring Payments button clicked");
    // Add logic to handle recurring payments
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h1>Deposits/Payments</h1>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
        <Card
          sx={{
            width: 600,
            padding: 4,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Make a Payment
            </Typography>

            {/* Deposit Card */}
            <Card
              sx={{
                width: 400,
                padding: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                marginBottom: 2,
                margin: "0 auto",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                  Enter Amount
                </Typography>
                <input
                  type="number"
                  step="0.01"
                  placeholder="$0.00"
                  style={{ width: "100%", padding: "10px", marginBottom: "10px", paddingBottom: "20px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <PaymentButton
                    onClick={() => console.log("Cancel button clicked")}
                    label="Cancel"
                  />
                  <PaymentButton
                    onClick={() => console.log("Next button clicked")}
                    label="Next"
                  />
                </div>

                {/* Deposit Money Button */}
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
            width: 600,
            padding: 4,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Set Up Recurring Payments
            </Typography>

            {/* Recurring Payments Card */}
            <Card
              sx={{
                width: 400,
                padding: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                marginBottom: 2,
                margin: "0 auto",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                  Enter Amount
                </Typography>
                <input
                  type="number"
                  step="0.01"
                  placeholder="$0.00"
                  style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
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
    </div>
  );
}
