import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  Divider,
} from "@mui/material";

export default function SignUp() {
  const navigate = useNavigate();
  const [handler, setHandler] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handler, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("An error occurred during signup");
    }
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        mt: 4,
        py: 5,
        minWidth: "20vw",
        boxShadow: 6,
        border: 1,
        borderColor: "gray",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Sign up
      </Typography>
      <Typography variant="subtitle2" color="gray">
        Create a new account
      </Typography>
      <FormControl fullWidth component="form" onSubmit={handleSignUp}>
        <TextField
          label="Username"
          type="text"
          variant="standard"
          fullWidth
          margin="dense"
          required
          value={handler}
          onChange={(e) => setHandler(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="standard"
          fullWidth
          margin="dense"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          margin="dense"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="outlined" color="primary" sx={{ mt: 4 }}>
          Sign up
        </Button>
        <Divider variant="middle" sx={{ my: 3 }} />
        <Button href="/login" variant="text" size="small">
          Login
        </Button>
      </FormControl>
    </Container>
  );
}
