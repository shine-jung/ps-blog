import { CodeBlock, paraisoLight } from "react-code-blocks";
import { Box, Typography, styled } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
}));

interface IViewCode {
  code?: string;
  language?: string;
}

function ViewCode({ code, language }: IViewCode) {
  return (
    <Box sx={{ fontFamily: "D2Coding, monospace" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>코드 보기</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CodeBlock
            text={code?.replaceAll("&nbsp;", " ") ?? ""}
            language={language ?? "cpp"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={paraisoLight}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ViewCode;
