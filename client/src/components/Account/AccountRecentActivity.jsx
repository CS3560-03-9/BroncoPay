/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Stack,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountAcitivityEntry from "./AccountActivityEntry";

export default function AccountRecentActivity({ listItems, sx }) {
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
            pb: 1,
          }}
        >
          <Typography variant="h5" sx={{ pr: 1 }}>
            Recent Activity
          </Typography>
          <ReceiptIcon />
        </Stack>
        {listItems && (
          <List>
            {listItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: 0,
                  py: 3,
                  borderBottom: 1,
                  borderColor: "grey.500",
                }}
              >
                <AccountAcitivityEntry entry={item} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
