import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ICurrentUser } from "./modules/types";
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
  userObj: ICurrentUser | null;
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
              <Route path="/view" element={<View userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              />
              <Route path="/home" element={<Home />} />
              <Route path="/home/post" element={<Post />} />
              <Route path="/home/view" element={<View userObj={userObj} />} />
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
