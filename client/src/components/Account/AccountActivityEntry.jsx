/* eslint-disable react/prop-types */
import { Typography, Box, Stack } from "@mui/material";

export default function AccountActivityEntry({ entry, user }) {
  const {
    transaction_id,
    from_handler,
    to_handler,
    amount,
    transaction_desc,
    creation,
    transaction_type,
  } = entry;

  // Generate dynamic title and balance indicator
  const generateEntryDetails = () => {
    switch (transaction_type) {
      case "TRANSACTION":
        if (from_handler === user) {
          // If the transaction is from the user (i.e., they sent money)
          return {
            title: `Sent $${amount} to ${to_handler}`,
            balanceChange: `- $${amount}`,
            balanceColor: "primary.main",
          };
        } else {
          // Else the transaction is to the user (i.e., they received money)
          return {
            title: `Received $${amount} from ${from_handler}`,
            balanceChange: `+ $${amount}`,
            balanceColor: "primary.main",
          };
        }
      case "DEPOSIT":
        return {
          title: `Deposited $${amount}`,
          balanceChange: `+ $${amount}`,
          balanceColor: "primary.main",
        };
      case "WITHDRAW":
        return {
          title: `Withdrew $${amount}`,
          balanceChange: `- $${amount}`,
          balanceColor: "primary.main",
        };
      default:
        return {
          title: `Transaction $${amount}`,
          balanceChange: `$${amount}`,
          balanceColor: "text.secondary",
        };
    }
  };

  const { title, balanceChange, balanceColor } = generateEntryDetails();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left section */}
      <Box>
        <Typography variant="body2" color="text.secondary">
          {new Date(creation).toDateString()}
        </Typography>
        <Typography variant="h6">{title}</Typography>
        {transaction_desc && (
          <Typography variant="body" color="text.secondary" sx={{ mt: 1 }}>
            {transaction_desc}
          </Typography>
        )}
      </Box>

      {/* Right section */}
      <Stack alignItems="flex-end" sx={{ ml: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: balanceColor,
            fontWeight: "bold",
          }}
        >
          {balanceChange}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: #{transaction_id}
        </Typography>
      </Stack>
    </Box>
  );
}
