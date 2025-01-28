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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      // Wait for profile to be loaded (max 5 seconds)
      let attempts = 0;
      while (!userProfile && attempts < 50) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      if (!userProfile) {
        throw new Error("Failed to load user profile");
      }

      // Login and profile loading successful, redirect to home
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // Wait for profile to be loaded (max 5 seconds)
      let attempts = 0;
      while (!userProfile && attempts < 50) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      if (!userProfile) {
        throw new Error("Failed to load user profile");
      }

      // Login and profile loading successful, redirect to home
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sign in with Google. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Sign In
      </Typography>

      <Box component="form" onSubmit={handleEmailLogin} noValidate>
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          Sign in with Google
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/register")}
          disabled={loading}
        >
          Don't have an account? Sign up
        </Button>
      </Box>
    </Paper>
  );
}
