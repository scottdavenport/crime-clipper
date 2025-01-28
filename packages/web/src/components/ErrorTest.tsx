import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

export default function ErrorTest() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("This is a test error from ErrorTest component!");
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Error Boundary Test
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => setShouldError(true)}
      >
        Trigger Error
      </Button>
    </Box>
  );
}
