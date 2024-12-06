/* eslint-disable react/prop-types */
import {
  Card,
  Dialog,
  IconButton,
  Typography,
  Divider,
  Box,
  Stack,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function BusinessManagePledgePopup({
  open,
  handleClose,
  pledge,
  sx,
}) {
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
            <AccountBalanceIcon sx={{ fontSize: 35 }} />
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Manage Pledge
            </Typography>
          </Stack>
          <Divider variant="middle" sx={{ mb: 2 }} />
          <Typography>{`Pledge ID: ${pledge.pledge_id}`}</Typography>
        </Box>
      </Card>
    </Dialog>
  );
}
