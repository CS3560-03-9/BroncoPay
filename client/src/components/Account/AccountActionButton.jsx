import { Typography, Card, CardActionArea } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function AccountActionButton({ text, icon, onClick, sx }) {
  return (
    <CardActionArea onClick={onClick} sx={{ width: "12rem" }}>
      <Card
        sx={{
          p: 2,
          height: "12rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 3,
          ...sx,
        }}
        raised
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
          {text}
        </Typography>
        {icon}
      </Card>
    </CardActionArea>
  );
}
