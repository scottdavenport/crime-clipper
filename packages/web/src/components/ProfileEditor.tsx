import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { userProfileService } from "../services/userProfile";
import { UpdateUserProfile } from "../types/user";

export default function ProfileEditor() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || "",
    bio: userProfile?.bio || "",
    location: userProfile?.location || "",
    socialLinks: {
      youtube: userProfile?.socialLinks?.youtube || "",
      spotify: userProfile?.socialLinks?.spotify || "",
      twitter: userProfile?.socialLinks?.twitter || "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const socialPlatform = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialPlatform]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const updateData: UpdateUserProfile = {
        uid: currentUser.uid,
        displayName: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        socialLinks: formData.socialLinks,
      };

      await userProfileService.updateProfile(updateData);
      setSuccess(true);

      // Reload the page to refresh the profile data
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser || !userProfile) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Please log in to edit your profile.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Display Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={loading}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Social Links
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="YouTube Channel"
              name="social.youtube"
              value={formData.socialLinks.youtube}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Spotify Profile"
              name="social.spotify"
              value={formData.socialLinks.spotify}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Twitter Profile"
              name="social.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Profile updated successfully!
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </Box>
    </Paper>
  );
}
