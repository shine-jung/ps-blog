import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../modules/types";
import {
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

const AppBar = styled("header")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  top: "0",
  zIndex: "50",
  position: "fixed",
  width: "100%",
  height: "56px",
  boxShadow: "0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1)",
  "&.visible": {
    top: "0",
    transition: "top 0.4s ease-out",
  },
  "&.hidden": {
    top: "-56px",
    transition: "top 0.4s ease-out",
  },
  [theme.breakpoints.up("sm")]: {
    height: "64px",
    "&.hidden": {
      top: "-64px",
      transition: "top 0.4s ease-out",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 4,
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
  userObj: IUser | null;
}

function Header({ userObj }: IHeaderProps) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickLogoutMenu = () => {
    if (window.confirm("???????????? ???????????????????")) {
      logout();
    }
    handleCloseUserMenu();
  };

  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const cls = visible ? "visible" : "hidden";
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={cls}>
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
              onClick={() => navigate({ pathname: "/" })}
            >
              pslog
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
                  navigate({ pathname: "/post" });
                }}
              >
                ??? ??? ??????
              </NavButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search???"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 0, mx: 2 }}>
              <Tooltip title="?????? ??????" arrow>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                    navigate({ pathname: `/@${userObj?.id}` });
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">??? ?????????</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate({ pathname: "/profile" });
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">????????? ??????</Typography>
                </MenuItem>
                <MenuItem onClick={handleClickLogoutMenu}>
                  <Typography textAlign="center">????????????</Typography>
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
