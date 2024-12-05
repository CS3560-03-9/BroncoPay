/* eslint-disable react/prop-types */
import { Card, Stack, Typography, Box, Divider } from "@mui/material";

export default function AccountInfoCard({ user }) {
  return (
    <Card raised sx={{ borderRadius: 3 }}>
      <Box sx={{ height: 20, backgroundColor: "info.main" }} />
      <Stack sx={{ m: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          {user.handler}
        </Typography>
        <Divider
          sx={{ my: 2, borderBottomWidth: 1, borderColor: "grey.500" }}
        />
        <Typography variant="h6" sx={{ fontWeight: 300, fontSize: 20 }}>
          {user.email}
        </Typography>
      </Stack>
    </Card>
  );
}
