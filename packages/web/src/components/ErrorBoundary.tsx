import React, { Component, ErrorInfo } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Reload the page to reset the state
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            p: 3,
          }}
        >
          <Paper
            sx={{
              p: 4,
              maxWidth: 600,
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom color="error">
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" paragraph>
              We're sorry, but something went wrong. Please try again or contact
              support if the problem persists.
            </Typography>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box sx={{ mt: 2, mb: 3, textAlign: "left" }}>
                <Typography variant="h6" gutterBottom>
                  Error Details:
                </Typography>
                <pre
                  style={{
                    overflow: "auto",
                    padding: "1rem",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                  }}
                >
                  {this.state.error.toString()}
                  {"\n\n"}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReset}
              sx={{ mt: 2 }}
            >
              Try Again
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
