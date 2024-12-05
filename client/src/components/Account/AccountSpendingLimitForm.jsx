/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AccountSpendingLimitForm({
  open,
  handleClose,
  onUpdate,
}) {
  const [newLimit, setNewLimit] = useState("");

  const handleChange = (event) => {
    setNewLimit(event.target.value);
  };

  const handleSubmit = () => {
    onUpdate(newLimit);
    setNewLimit("");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Box sx={{ padding: 4, position: "relative" }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
          Update Spending Limit
        </Typography>
        <TextField
          variant="outlined"
          label="New Limit"
          fullWidth
          value={newLimit}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Box>
    </Dialog>
  );
}
