import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
