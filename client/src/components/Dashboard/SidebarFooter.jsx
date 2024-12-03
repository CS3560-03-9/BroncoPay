import { Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini ? "© BP" : `© 2024 Created by BroncoPay`}
    </Typography>
  );
}
