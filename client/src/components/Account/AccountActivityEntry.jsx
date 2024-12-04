/* eslint-disable react/prop-types */
import { Typography, Box } from "@mui/material";

export default function AccountActivityEntry({ entry }) {
  return (
    <Box>
      <Typography variant="body1">
        From: {entry.from_handler} → To: {entry.to_handler}
      </Typography>
      <Typography variant="body2">Amount: ${entry.amount}</Typography>
      <Typography variant="body2">
        Description: {entry.transaction_desc}
      </Typography>
      <Typography variant="body2">
        Date: {new Date(entry.creation).toLocaleString()}
      </Typography>
      <Typography variant="body2">Type: {entry.transaction_type}</Typography>
    </Box>
  );
}
