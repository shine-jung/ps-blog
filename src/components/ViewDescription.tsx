import { Box } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import "../styles/viewer.css";

interface IViewDescription {
  description: string | undefined;
}

function ViewDescription({ description }: IViewDescription) {
  return (
    <Box marginBottom={8}>
      <Viewer initialValue={description ?? ""} />
    </Box>
  );
}

export default ViewDescription;
