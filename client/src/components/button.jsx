import * as React from "react";
import Button from "@mui/material/Button";

export default function PaymentButton({ onClick, label }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
}
