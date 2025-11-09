import React from "react";
import "./index.css";
import "./App.css"
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <AppProvider>
          <Routes>

            <Route path="/" element={<Dashboard />} />

            {/* <Route path="/auth" element={<AuthPages />} /> */}
            {/* <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/farms" element={<Farms />} />
              <Route path="/settings" element={<Settings />} />
            </Route> */}

          </Routes>
        </AppProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
