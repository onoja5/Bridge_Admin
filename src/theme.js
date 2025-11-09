import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Green
    },
    secondary: {
      main: "#FFC107", // Optional: Yellow for contrast
    },
    background: {
      default: "#F1F8E9", // Light Green Background
    },
    text: {
      primary: "#2E7D32", // Dark Green Text
      secondary: "#1B5E20",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          padding: "10px 20px",
        },
      },
    },
  },
});

export default theme;
