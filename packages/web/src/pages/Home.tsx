import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import FirebaseTest from "../components/FirebaseTest";

function Home() {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Crime Clipper
        </Typography>
        <Typography variant="body1" paragraph>
          Your trusted platform for crime statistics and analysis.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <FirebaseTest />
      </Paper>
    </Box>
  );
}

export default Home;
