import { Box } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import "../styles/viewer.css";

interface IViewDescription {
  description?: string;
}

function ViewDescription({ description }: IViewDescription) {
  return (
    <Box p={3}>
      <Viewer initialValue={description ?? ""} />
    </Box>
  );
}

export default ViewDescription;
