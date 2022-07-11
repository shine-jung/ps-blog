import { createTheme } from "@mui/material/styles";

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

export const lightTheme = createTheme({
  breakpoints: breakPoints,
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    background: {
      default: "#F9FAFB",
      paper: "#fff",
    },
  },
  typography: textStyle,
});

export const darkTheme = createTheme({
  breakpoints: breakPoints,
  palette: {
    mode: "dark",
    primary: {
      main: "#1F2937",
    },
    background: {
      default: "#1F2937",
      paper: "#101827",
    },
  },
  typography: textStyle,
});
