import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IUserObj } from "./module/types";
import Header from "./components/Header";
import Auth from "./routes/Auth";
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
