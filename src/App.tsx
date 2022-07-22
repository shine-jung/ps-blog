import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Router from "./Router";
import { auth } from "./services/firebase";
import { getCurrentUser } from "./services/user";
import { isDarkAtom } from "./services/atoms";
import { IUser } from "./types/types";
import { lightTheme, darkTheme } from "./utils/theme";
import { Loader } from "./components/components";

const GlobalStyle = createGlobalStyle`
  ul,
  ol {
    padding: 6px 0px 0px 20px;
  }
  ul li,
  ol li {
    padding: 0px 0px 8px 4px;
  }
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
            isRegistered={Boolean(userObj?.id)}
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
