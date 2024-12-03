import { Card, CardContent, Typography, Stack } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

// eslint-disable-next-line react/prop-types
export default function AccountBalanceCard({ balance, sx }) {
  return (
    <Card
      sx={{
        width: 300,
        padding: 2,
        ...sx,
      }}
      raised
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            pb: 1,
          }}
        >
          <Typography variant="h5" sx={{ pr: 1 }}>
            Account Balance
          </Typography>
          <PaymentIcon />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            ${balance}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
