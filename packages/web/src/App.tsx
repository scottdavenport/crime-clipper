import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
