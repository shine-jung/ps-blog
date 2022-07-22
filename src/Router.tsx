import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { IUser } from "./modules/types";
import LogIn from "./routes/LogIn";
import Main from "./routes/Main";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import UploadPost from "./routes/UploadPost";
import EditPost from "./routes/EditPost";
import ViewPost from "./routes/ViewPost";
import Register from "./routes/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
      <Header userObj={userObj} isLoggedIn={isRegistered} />
      <Routes>
        {isLoggedIn ? (
          <Route
            path="/profile"
            element={<Profile refreshUser={refreshUser} userObj={userObj} />}
          />
        ) : (
          <Route path="/login" element={<LogIn />} />
        )}
        {isLoggedIn && !isRegistered ? (
          <Route
            path="/*"
            element={<Register refreshUser={refreshUser} userObj={userObj} />}
          />
        ) : (
          <>
            <Route path="/" element={<Main />} />
            <Route
              path="/post"
              element={
                <UploadPost refreshUser={refreshUser} userObj={userObj} />
              }
            />
            <Route
              path="/edit"
              element={<EditPost refreshUser={refreshUser} userObj={userObj} />}
            />
            <Route path="/@:userId" element={<Home />} />
            <Route path="/@:userId/:articleNumber" element={<ViewPost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
