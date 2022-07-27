import {
  Box,
  InputBase,
  Paper,
  Typography,
  ButtonBase,
  styled,
  alpha,
  Divider,
} from "@mui/material";

export const Loader = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 300,
  backgroundColor: theme.palette.background.default,
  zIndex: 10,
}));

export const TextInput = styled(InputBase)(({ theme }) => ({
  width: "200px",
  color: "inherit",
  fontSize: "1rem",
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  padding: "2px 12px 2.5px",
  borderRadius: "4px",
}));

export const CodeInput = styled(InputBase)(({ theme }) => ({
  color: "#222222",
  backgroundColor: "#f9fafb",
  fontSize: "1rem",
  fontFamily: "Open Sans, sans-serif",
  fontWeight: "400",
  padding: "18px 25px",
  marginBottom: theme.spacing(3),
  border: "1px solid #dadde6",
  borderRadius: "4px",
}));

export const Label = styled(Typography)(({ theme }) => ({
  padding: "6.25px 8px",
}));

export const CustomBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
}));

export const PostCardPaper = styled(Paper)(() => ({
  borderRadius: 12,
  boxShadow: "rgb(0 0 0 / 4%) 0px 4px 16px 0px",
  transition: "all 0.15s ease-in 0s",
  "&:hover": {
    transform: "translateY(-4px);",
    boxShadow: "rgb(0 0 0 / 8%) 0px 12px 20px 0px",
  },
}));

export const CommentCardPaper = styled(Paper)(() => ({
  padding: "1rem",
  borderRadius: "0.375rem",
  boxShadow: "0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1)",
}));

export const FormBox = styled("form")(() => ({
  display: "flex",
  alignItems: "flex-end",
}));

export const CardDivider = styled(Divider)(({ theme }) => ({
  borderColor: alpha(theme.palette.grey[500], 0.15),
}));

// Header.tsx
export const AppBar = styled("header")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  top: "0",
  zIndex: "50",
  position: "fixed",
  width: "100%",
  height: "56px",
  "&.transparent": {
    backgroundColor: "transparent",
    transition: "background-color",
    boxShadow: "none",
  },
  "&.paper": {
    backgroundColor: theme.palette.background.paper,
    transition: "background-color",
    boxShadow: "rgb(0 0 0 / 8%) 0px 0px 8px",
  },
  [theme.breakpoints.up("sm")]: {
    height: "64px",
  },
}));

export const Search = styled("div")(({ theme }) => ({
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

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const SearchInputBase = styled(InputBase)(({ theme }) => ({
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

export const NavButton = styled(ButtonBase)(({ theme }) => ({
  display: "block",
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[500], 0.25),
  },
  padding: "6px 8px",
  borderRadius: "4px",
}));
