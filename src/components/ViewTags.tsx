import { Box, styled } from "@mui/material";

const Ul = styled("ul")(() => ({
  display: "inline",
  padding: 0,
  margin: 0,
}));

const Li = styled("li")(({ theme }) => ({
  fontSize: "13px",
  display: "inline-block",
  marginTop: "6px",
  marginRight: "6px",
  padding: "3px 5px",
  borderRadius: "4px",
  backgroundColor: theme.palette.action.selected,
}));

interface IViewTags {
  tags?: string[];
}

function ViewTags({ tags }: IViewTags) {
  return (
    <Box marginBottom="6px">
      <Ul>
        {tags?.map((tag: string, index) => (
          <Li key={index}>{tag}</Li>
        ))}
      </Ul>
    </Box>
  );
}

export default ViewTags;
