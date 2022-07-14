import { useEffect, useState } from "react";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./modules/theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./service/atoms";
import { CssBaseline } from "@mui/material";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "./service/firebase";
import { IUserObj, IUserUpdateArgs } from "./modules/types";
import { Loader } from "./components/customComponents";

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }
  .heart-icon {
    color: #ff6666;
    margin-right: 5px;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<IUserObj | null>();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args: IUserUpdateArgs) => updateProfile(user, args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    if (user) {
      setUserObj({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        updateProfile: (args: IUserUpdateArgs) => updateProfile(user, args),
      });
    }
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
