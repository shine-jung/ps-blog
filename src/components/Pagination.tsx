import { ButtonBase, styled } from "@mui/material";

const Button = styled(ButtonBase)(({ theme }) => ({
  border: "none",
  borderRadius: 4,
  padding: 8,
  margin: 0,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  "&[disabled]": {
    color: theme.palette.action.disabled,
    cursor: "revert",
  },
  "&[aria-current]": {
    backgroundColor: theme.palette.action.selected,
    cursor: "revert",
  },
}));

const Nav = styled("nav")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
}));

interface IPaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

function Pagination({ total, limit, page, setPage }: IPaginationProps) {
  const numPages = Math.ceil(total / limit);
  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array<number>(numPages)
          .fill(0)
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;
