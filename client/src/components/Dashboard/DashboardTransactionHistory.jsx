import React from "react";

import {
  List,
  ListItem,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
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
          }}
        >
          <Typography variant="h4" sx={{ pr: 1, fontWeight: "bold" }}>
            Transactions
          </Typography>
          <HistoryIcon fontSize="large" />
        </Stack>
        {entries && (
          <List>
            {entries.map(
              (item, index) => (
                console.log(item),
                (
                  <ListItem
                    key={index}
                    sx={{
                      padding: 0,
                      py: 3,
                      borderBottom: 1,
                      borderColor: "grey.500",
                    }}
                  >
                    <AccountActivityEntry entry={item} />
                  </ListItem>
                )
              )
            )}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
