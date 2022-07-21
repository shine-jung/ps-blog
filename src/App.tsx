import { useEffect, useState } from "react";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./modules/theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./service/atoms";
import { CssBaseline } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./service/firebase";
import { getCurrentUser } from "./service/user";
import { IUser } from "./modules/types";
import { Loader } from "./components/components";

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<IUser | null>();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getCurrentUser().then((userData) => setUserObj(userData));
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    getCurrentUser().then((userData) => setUserObj(userData));
  };
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <GlobalStyle />
        {init ? (
          <Router
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            isRegistered={userObj?.isRegistered ?? false}
            userObj={userObj ?? null}
          />
        ) : (
          <Loader>Loading...</Loader>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
