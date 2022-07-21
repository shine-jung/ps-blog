import { createTheme } from "@mui/material/styles";
import { Shadows } from "@mui/material/styles/shadows";

const breakPoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1280,
    xl: 1536,
  },
};

const textStyle = {
  fontFamily: "Source Sans Pro, sans-serif",
};

const shadows = [
  "none",
  ...Array(25).fill("rgb(0 0 0 / 8%) 0px 0px 8px"),
] as Shadows;

export const lightTheme = createTheme({
  breakpoints: breakPoints,
  palette: {
    mode: "light",
    primary: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },
    background: {
      default: "#F9FAFB",
      paper: "#fff",
    },
  },
  shadows: shadows,
  typography: textStyle,
});

export const darkTheme = createTheme({
  breakpoints: breakPoints,
  palette: {
    mode: "dark",
    primary: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      default: "#1F2937",
      paper: "#374251",
    },
  },
  shadows: shadows,
  typography: textStyle,
});
