import { Box } from "@mui/material";
import { CodeBlock, paraisoLight } from "react-code-blocks";

interface IViewCode {
  code: string | undefined;
  language: string | undefined;
}

function ViewCode({ code, language }: IViewCode) {
  return (
    <Box
      marginTop={1}
      marginBottom={8}
      sx={{ fontFamily: "D2Coding, monospace" }}
    >
      <CodeBlock
        text={code?.replaceAll("&nbsp;", " ") ?? ""}
        language={language ?? "cpp"}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={paraisoLight}
      />
    </Box>
  );
}

export default ViewCode;
