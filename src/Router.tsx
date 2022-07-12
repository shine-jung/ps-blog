import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IUserObj } from "./module/types";
import Header from "./components/Header";
import SignIn from "./routes/SignIn";
import Main from "./routes/Main";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import Post from "./routes/Post";

interface IRouterProps {
  refreshUser: () => void;
  isLoggedIn: boolean;
  userObj: IUserObj | null;
}

function Router({ refreshUser, isLoggedIn, userObj }: IRouterProps) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Header userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/profile"
              element={<Profile refreshUser={refreshUser} userObj={userObj} />}
            />
            <Route path="/post" element={<Post />} />
          </>
        ) : (
          <Route path="/*" element={<SignIn />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
