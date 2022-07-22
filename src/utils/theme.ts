import { createTheme } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";
import { Shadows } from "@mui/material/styles/shadows";

const defaultTheme = {
  typography: { fontFamily: "Source Sans Pro, sans-serif" },
  shadows: [
    ...Array(2).fill("none"),
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    ...Array(22).fill("rgb(0 0 0 / 8%) 0px 0px 8px"),
  ] as Shadows,
};

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#689f38",
    },
    background: {
      default: "#F9FAFB",
      paper: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "dark",
    primary: lightGreen,
    background: {
      default: "#1F2937",
      paper: "#374251",
    },
  },
});
