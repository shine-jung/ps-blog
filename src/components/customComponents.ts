import styled from "styled-components";
import {
  alpha,
  Box,
  InputBase,
  Paper,
  styled as muiStyled,
  Typography,
} from "@mui/material";

export const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
`;

export const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "13px",
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  padding: "4px 8px",
  borderRadius: "4px",
}));

export const CodeInput = muiStyled(InputBase)(({ theme }) => ({
  color: "#222222",
  backgroundColor: "#f9fafb",
  fontSize: "13px",
  fontFamily: "Open Sans, sans-serif",
  fontWeight: "400",
  padding: "18px 25px",
  marginBottom: theme.spacing(2.5),
  border: "1px solid #dadde6",
  borderRadius: "4px",
}));

export const DescriptionBox = muiStyled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "200px",
  color: "#222222",
  backgroundColor: "#f9fafb",
  fontSize: "13px",
  fontFamily: "Open Sans, sans-serif",
  fontWeight: "400",
  padding: "18px 25px 64px",
  marginBottom: theme.spacing(2.5),
  border: "1px solid #dadde6",
  borderRadius: "4px",
}));

export const Label = muiStyled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const CustomBox = muiStyled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
}));

export const PaperOne = muiStyled(Paper)(() => ({
  padding: "1rem",
  borderRadius: "0.875rem",
  boxShadow: "0 4px 6px -1px rgb(0 0 0/0.1)",
  transition: "all 0.1s linear",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

export const PaperTwo = muiStyled(Paper)(() => ({
  padding: "1rem",
  borderRadius: "0.375rem",
  boxShadow: "0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1)",
}));

export const FormBox = muiStyled("form")(() => ({
  display: "flex",
  alignItems: "flex-end",
}));
