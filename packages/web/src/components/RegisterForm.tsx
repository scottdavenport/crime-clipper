import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const waitForProfile = async () => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds total

    while (attempts < maxAttempts) {
      // Check if profile exists
      if (userProfile) {
        return true;
      }
      // Wait 100ms before next check
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
    return false;
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      // Create the user account
      await createUserWithEmailAndPassword(auth, email, password);

      // Wait for profile creation (max 5 seconds)
      const profileCreated = await waitForProfile();

      if (!profileCreated) {
        throw new Error("Failed to create user profile - timeout");
      }

      // Registration and profile creation successful, redirect to home
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // Wait for profile creation (max 5 seconds)
      const profileCreated = await waitForProfile();

      if (!profileCreated) {
        throw new Error("Failed to create user profile - timeout");
      }

      // Registration and profile creation successful, redirect to home
      navigate("/");
    } catch (err) {
      console.error("Google registration error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sign up with Google. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Create Account
      </Typography>

      <Box component="form" onSubmit={handleEmailRegister} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleRegister}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          Sign up with Google
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/login")}
          disabled={loading}
        >
          Already have an account? Sign in
        </Button>
      </Box>
    </Paper>
  );
}
