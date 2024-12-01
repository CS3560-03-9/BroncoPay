import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
} from "@mui/material";

export default function Login() {
  const handleSignUp = () => {
    // ** TODO: API shenanigans here **
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        mt: 4,
        padding: 10,
        minWidth: "20vw",
        boxShadow: 6,
        border: 1,
        borderColor: "gray",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Sign up
      </Typography>
      <FormControl fullWidth>
        <TextField
          label="Username"
          type="username"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleSignUp}
        >
          Sign up
        </Button>
      </FormControl>
    </Container>
  );
}
