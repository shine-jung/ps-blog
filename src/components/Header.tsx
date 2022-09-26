import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { IUser } from "../types/types";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Container,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  AppBar,
  Search,
  SearchIconWrapper,
  SearchInputBase,
  NavButton,
} from "./components";
import CodeIcon from "@mui/icons-material/Code";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useSetRecoilState } from "recoil";
import { searchTermState } from "../services/atoms";

interface IHeaderProps {
  userObj: IUser | null;
  isLoggedIn: boolean;
}

function Header({ userObj, isLoggedIn }: IHeaderProps) {
  const navigate = useNavigate();
  const setSearchAtom = useSetRecoilState(searchTermState);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickLogoutMenu = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout();
    }
    handleCloseUserMenu();
    alert("로그아웃 되었습니다");
  };
  const [position, setPosition] = useState(window.pageYOffset);
  const transparent = position < 56 ? "transparent" : "paper";
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchAtom(searchTerm.trim());
    setSearchTerm("");
    navigate("/");
  };
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box flexGrow={1} height={128}>
      <AppBar className={`${transparent}`}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton
              sx={{ p: 0, mr: 2 }}
              onClick={() => {
                setSearchAtom("");
                navigate("/");
              }}
              disableRipple
            >
              <CodeIcon sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "Spoqa Han Sans Neo, monospace",
                fontWeight: 300,
                letterSpacing: "0.25rem",
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                setSearchAtom("");
                navigate("/");
              }}
            >
              pslog
            </Typography>
            {isLoggedIn && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  ml: 2.5,
                }}
              >
                <NavButton
                  onClick={() => {
                    navigate("/post");
                  }}
                >
                  새 글 쓰기
                </NavButton>
              </Box>
            )}
            <Box flexGrow={1} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={onSubmit}>
                <SearchInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchTerm}
                  onChange={onChange}
                />
              </form>
            </Search>
            <Box flexGrow={0} ml={2}>
              {isLoggedIn ? (
                <>
                  <Tooltip title="메뉴 열기" arrow>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                      disableRipple
                    >
                      <Avatar
                        alt={userObj?.name}
                        src={userObj?.photoURL}
                        sx={{ width: 32, height: 32 }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate(`/@${userObj?.id}`);
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">내 블로그</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">프로필 편집</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClickLogoutMenu}>
                      <Typography textAlign="center">로그아웃</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Tooltip title="로그인" arrow>
                    <IconButton
                      onClick={() => {
                        navigate("/login");
                      }}
                      sx={{ p: 0.5 }}
                      disableRipple
                    >
                      <LoginIcon sx={{ width: 24, height: 24 }} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
