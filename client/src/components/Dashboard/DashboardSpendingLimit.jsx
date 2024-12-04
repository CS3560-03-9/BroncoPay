/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  CardContent,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

export default function DashboardSpendingLimit({ balance, limit, sx }) {
  const spendingPercentage = Math.min((balance / limit) * 100, 100);

  return (
    <Card
      sx={{
        padding: 2,
        ...sx,
      }}
      raised
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            pb: 2,
          }}
        >
          <Typography variant="h6">Spending Limit</Typography>
          <PriceCheckIcon />
        </Stack>
        <Box sx={{ pb: 4 }}>
          <Divider sx={{ borderBottomWidth: 2 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={spendingPercentage}
              size={200}
              thickness={5}
              sx={{
                color: spendingPercentage < 100 ? "primary.main" : "error.main",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ${balance}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                / ${limit}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
