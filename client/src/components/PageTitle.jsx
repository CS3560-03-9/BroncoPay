import { Typography, Stack, Divider } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function PageTitle({ title, icon }) {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          m: 4,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {icon}
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Stack>
      <Divider variant="middle" />
    </>
  );
}
