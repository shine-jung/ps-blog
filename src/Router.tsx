import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import { IUserObj } from "./module/types";
import Header from "./components/Header";

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
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
