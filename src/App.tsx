import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Router from "./Router";
import { auth } from "./services/firebase";
import { getCurrentUser } from "./services/user";
import { isDarkAtom } from "./services/atoms";
import { IUser } from "./types/types";
import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";
import { Loader } from "./components/components";

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


// test for commit