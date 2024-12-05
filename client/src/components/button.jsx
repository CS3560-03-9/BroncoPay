import * as React from "react";
import Button from "@mui/material/Button";

export default function PaymentButton({ onClick, label }) {
  return (
    <Button variant="outlined" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
}
