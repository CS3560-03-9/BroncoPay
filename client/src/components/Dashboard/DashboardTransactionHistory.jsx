/* eslint-disable react/prop-types */
import { Card, CardContent, Stack, Typography, Divider } from "@mui/material";
import AccountActivityEntry from "../Account/AccountActivityEntry";
import HistoryIcon from "@mui/icons-material/History";

export default function DashboardTransactionHistory({ entries, sx }) {
  return (
    <Card
      sx={{
        padding: 4,
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
            pb: 2,
          }}
        >
          <Typography variant="h4" sx={{ pr: 1, fontWeight: "bold" }}>
            Transactions
          </Typography>
          <HistoryIcon fontSize="large" />
        </Stack>
        {entries && (
          <Stack
            spacing={2}
            divider={<Divider sx={{ borderBottomWidth: 2 }} />}
          >
            {entries.map((item, index) => (
              <AccountActivityEntry key={index} entry={item} />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
