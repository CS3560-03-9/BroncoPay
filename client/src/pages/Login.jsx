// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { SignInPage } from "@toolpad/core/SignInPage";

import { Button } from "@mui/material";

const providers = [
  { id: "google", name: "Google" },
  { id: "credentials", name: "Credentials" },
];

export default function Login() {
  const navigate = useNavigate();

  // Handles clicking the sign in button
  const signIn = async (provider, formData) => {
    try {
      if (provider.id === "credentials") {
        console.log(
          `Received Provider: ${provider.name}, Email: ${formData.get("email")}, Password: ${formData.get("password")}`
        );
      } else if (provider.id === "google") {
        console.log(`Received Provider: ${provider.name}`);
        throw new Error("Google sign in is not implemented yet.");
        // ** TODO: Handle google oauth here **
      }

      // ** TODO: Do some oauth/api shenanigans here **

      // Assuming successful
      navigate("/"); // redirect to dashboard
    } catch (err) {
      console.log(err);
      alert("Error signing in. Please try again.");
    }
  };

  const SignUpButton = () => {
    return (
      <Button href="/signup" variant="text" size="sm" fullWidth>
        Sign Up
      </Button>
    );
  };

  return (
    <SignInPage
      sx={{ minWidth: "100vw" }}
      signIn={signIn}
      providers={providers}
      slotProps={{
        emailField: { variant: "standard" },
        passwordField: { variant: "standard" },
        submitButton: { variant: "outlined" },
      }}
      slots={{ signUpLink: SignUpButton }}
    />
  );
}
