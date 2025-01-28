import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { userProfileService } from "../services/userProfile";

export default function ProfileDebug() {
  const { currentUser, userProfile } = useAuth();

  const handleTestUpdate = async () => {
    if (!currentUser) return;

    try {
      await userProfileService.updateProfile({
        uid: currentUser.uid,
        displayName: "Test User " + new Date().toISOString(),
        bio: "This is a test bio update",
        location: "Test Location",
        socialLinks: {
          youtube: "https://youtube.com/test",
          spotify: "https://spotify.com/test",
          twitter: "https://twitter.com/test",
        },
      });

      // Reload the page to see changes
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile Debug Page
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Authentication State:
        </Typography>
        <pre>{JSON.stringify(currentUser?.toJSON(), null, 2)}</pre>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Profile:
        </Typography>
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>
      </Paper>

      <Button
        variant="contained"
        onClick={handleTestUpdate}
        disabled={!currentUser}
      >
        Test Profile Update
      </Button>
    </Box>
  );
}
