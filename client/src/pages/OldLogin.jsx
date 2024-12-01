import React from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

export default function Login() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}
