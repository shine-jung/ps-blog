import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IUserObj } from "../modules/types";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Container,
  Avatar,
  Tooltip,
  ButtonBase,
  styled,
  alpha,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../service/auth";
import LightDarkToggle from "./LightDarkToggle";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[500], 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavButton = styled(ButtonBase)(({ theme }) => ({
  display: "block",
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  padding: "6px 8px",
  borderRadius: "4px",
}));

interface IHeaderProps {
  userObj: IUserObj | null;
}

function Header({ userObj }: IHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = userObj?.displayName && location.pathname.includes("/home");
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
      alert("로그아웃 되었습니다");
    }
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ height: { xs: "56px", sm: "64px" }, flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              onClick={() => navigate({ pathname: "/" })}
            >
              <CodeIcon fontSize="large" />
            </IconButton>
            <Typography
              variant={isHome ? "h6" : "h5"}
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "Spoqa Han Sans Neo, monospace",
                fontWeight: 300,
                letterSpacing: isHome ? null : "0.25rem",
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={() => navigate({ pathname: isHome ? "/home" : "/" })}
            >
              {isHome ? `${userObj.displayName}님의 블로그` : "pslog"}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                ml: 2.5,
              }}
            >
              <NavButton
                onClick={() => {
                  navigate({ pathname: "/home/post" });
                }}
              >
                새 글 쓰기
              </NavButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 0, mx: 2 }}>
              <Tooltip title="메뉴 열기" arrow>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userObj?.displayName ?? "이름"}
                    src={userObj?.photoURL ?? undefined}
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
                    navigate({ pathname: "/home" });
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">내 블로그</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate({ pathname: "/profile" });
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">프로필 편집</Typography>
                </MenuItem>
                <MenuItem onClick={handleClickLogoutMenu}>
                  <Typography textAlign="center">로그아웃</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <LightDarkToggle />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
