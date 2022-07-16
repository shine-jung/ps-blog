import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { IUser } from "./modules/types";
import Header from "./components/Header";
import LogIn from "./routes/LogIn";
import Main from "./routes/Main";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import Post from "./routes/Post";
import View from "./routes/View";
import Register from "./routes/Register";
import ScrollToTop from "./components/ScrollToTop";

interface IRouterProps {
  refreshUser: () => void;
  isLoggedIn: boolean;
  isRegistered: boolean;
  userObj: IUser | null;
}

function Router({
  refreshUser,
  isLoggedIn,
  isRegistered,
  userObj,
}: IRouterProps) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {isRegistered && <Header userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          isRegistered ? (
            <>
              <Route path="/" element={<Main />} />
              <Route
                path="/profile"
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              />
              <Route
                path="/post"
                element={<Post refreshUser={refreshUser} userObj={userObj} />}
              />
              <Route path="/@:userId" element={<Home />} />
              <Route path="/@:userId/:articleNumber" element={<View />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <Route
              path="/*"
              element={<Register refreshUser={refreshUser} userObj={userObj} />}
            />
          )
        ) : (
          <Route path="/*" element={<LogIn />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
