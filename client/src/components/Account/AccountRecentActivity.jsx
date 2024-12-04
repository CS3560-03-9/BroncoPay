/* eslint-disable react/prop-types */
import { Card, CardContent, Stack, Typography, Divider } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountAcitivityEntry from "./AccountActivityEntry";

export default function AccountRecentActivity({ listItems, sx, user }) {
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
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            pb: 2,
          }}
        >
          <Typography variant="h5" sx={{ pr: 1 }}>
            Recent Activity
          </Typography>
          <ReceiptIcon />
        </Stack>
        {listItems && (
          <Stack
            spacing={2}
            divider={<Divider sx={{ borderBottomWidth: 2 }} />}
          >
            {listItems.map((item, index) => (
              <AccountAcitivityEntry key={index} entry={item} user={user} />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
