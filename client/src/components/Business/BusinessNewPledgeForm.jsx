/* eslint-disable react/prop-types */
import { useState } from "react";

import {
  Card,
  Dialog,
  IconButton,
  Typography,
  Divider,
  Box,
  Stack,
  TextField,
  MenuItem,
  Grid2,
  Button,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import CloseIcon from "@mui/icons-material/Close";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function BusinessNewPledgeForm({
  open,
  handleClose,
  onCreatePledge,
  sx,
}) {
  const [data, setData] = useState({
    cost: "",
    interval: "Monthly",
    desc: "",
  });

  const [touched, setTouched] = useState({
    desc: false,
  });

  const confirmCreate = () => {
    if (!data.cost || !data.interval || !data.desc) return;
    onCreatePledge(data);
    handleClose();
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
      <Card sx={{ ...sx }} raised>
        <Box sx={{ p: 4 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ my: 3, alignItems: "center", justifyContent: "center" }}
          >
            <ReceiptLongIcon sx={{ fontSize: 35 }} />
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Create a New Pledge
            </Typography>
          </Stack>
          <Divider variant="middle" sx={{ mb: 2 }} />

          <Stack spacing={3} sx={{ p: 2, mt: 4 }}>
            <Grid2 container spacing={2}>
              {/* cost */}
              <Grid2 size={6}>
                <TextField
                  label="Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => setData({ ...data, cost: e.target.value })}
                />
              </Grid2>

              {/* interval */}
              <Grid2 size={6}>
                <TextField
                  label="Interval"
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="Monthly"
                  onSelect={(e) =>
                    setData({ ...data, interval: e.target.value })
                  }
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Quarterly" disabled>
                    Quarterly
                  </MenuItem>
                  <MenuItem value="Semi-annually" disabled>
                    Semi-annually
                  </MenuItem>
                  <MenuItem value="Annually" disabled>
                    Annually
                  </MenuItem>
                </TextField>
              </Grid2>
            </Grid2>

            {/* description */}
            <TextField
              label="Pledge Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={(e) => setData({ ...data, desc: e.target.value })}
              onBlur={() => handleBlur("desc")}
              error={touched.desc && !data.desc}
              helperText={
                touched.desc && !data.desc ? "Description is required" : ""
              }
            />

            {/* submit button */}
            <Box sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={confirmCreate}>
                Create Pledge
              </Button>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Dialog>
  );
}
