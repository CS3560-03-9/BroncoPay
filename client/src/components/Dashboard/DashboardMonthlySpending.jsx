/* eslint-disable react/prop-types */
import { Card, Typography, CardContent, Stack } from "@mui/material";

// Bill for subscriptions
export default function DashboardMonthlySpending({ balance, sx }) {
  return (
    <Card
      sx={{
        padding: 2,
        ...sx,
      }}
      raised
    >
      <CardContent sx={{ alignItems: "center" }}>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            pb: 1,
          }}
        >
          <Typography variant="subtitle" inline>
            In
          </Typography>
          <Typography variant="subtitle" sx={{ fontWeight: "bold" }} inline>
            {new Date().toLocaleString("default", { month: "long" })},
          </Typography>
          <Typography variant="subtitle" sx={{ mr: 2 }} inline>
            {"you've spent"}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: 200 }} color="info.light">
            ${balance}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
