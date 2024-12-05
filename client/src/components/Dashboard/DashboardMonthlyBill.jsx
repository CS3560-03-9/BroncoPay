/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  CardContent,
  Stack,
  Divider,
  Box,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

// Bill for subscriptions
export default function DashboardMonthlyBill({ subscriptions, sx }) {
  // Sum of all subscription costs (for now, everything should be monthly)
  const totalSubscriptionsCost = subscriptions.reduce(
    (acc, sub) => acc + sub.cost,
    0
  );

  const navigate = useNavigate();
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
            justifyContent: "center",
            textAlign: "left",
            pb: 2,
          }}
        >
          <Typography variant="subtitle" inline="true">
            Average
          </Typography>
          <Typography
            variant="subtitle"
            sx={{ fontWeight: "bold" }}
            inline="true"
          >
            Subscription Cost
          </Typography>
          <Typography variant="subtitle" sx={{ mr: 2 }} inline="true">
            per Month
          </Typography>
        </Stack>
        <Box sx={{ pb: 2 }}>
          <Divider sx={{ borderBottomWidth: 2 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 400 }}
              color="info.light"
            >
              ${totalSubscriptionsCost}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 200, ml: 1 }}>
              over
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 200 }} color="info.main">
            {subscriptions.length} subscriptions
          </Typography>
          <Button
            variant="outlined"
            color="info"
            sx={{ mt: 3 }}
            onClick={() => navigate("/subscriptions")}
          >
            Manage Subscriptions
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
