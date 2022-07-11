import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { CssBaseline } from "@mui/material";

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color:inherit;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
