import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FirebaseApp } from "firebase/app";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { app } from "../config/firebase";

// Initialize Functions and connect to emulator
const functions = getFunctions(app as FirebaseApp);
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export default function FirebaseTest() {
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");

  const testFunction = async () => {
    try {
      setError("");
      const helloWorld = httpsCallable(functions, "helloWorld");
      const result = await helloWorld();
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Firebase Connection Test
      </Typography>

      <Button variant="contained" onClick={testFunction} sx={{ mb: 2 }}>
        Test Firebase Function
      </Button>

      {response && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Response:</Typography>
          <pre>{response}</pre>
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 2, color: "error.main" }}>
          <Typography variant="subtitle1">Error:</Typography>
          <pre>{error}</pre>
        </Box>
      )}
    </Box>
  );
}
