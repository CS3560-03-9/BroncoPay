/* eslint-disable react/prop-types */
import { Card, Stack, Typography, Box } from "@mui/material";

export default function AccountSpendingLimitCard({ limit }) {
  return (
    <Card raised sx={{ borderRadius: 3 }}>
      <Box sx={{ height: 20, backgroundColor: "warning.light" }} />
      <Stack sx={{ m: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 300 }}>
          Spending Limit
        </Typography>
        <Typography
          variant="h4"
          color="primary.main"
          sx={{ fontWeight: 400, mt: 1 }}
        >
          ${limit}
        </Typography>
      </Stack>
    </Card>
  );
}
