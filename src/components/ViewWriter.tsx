import { Link } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";

interface IViewWriter {
  userId?: string;
  userPhotoURL?: string;
}

function ViewWriter({ userId, userPhotoURL }: IViewWriter) {
  const userLink = `/@${userId}`;
  return (
    <Link to={userLink}>
      <Box display="flex">
        <Avatar
          alt={userId}
          src={userPhotoURL}
          sx={{ width: 24, height: 24, mr: 1 }}
        />
        <Typography fontWeight={300} color="text.secondary">
          by&nbsp;
        </Typography>
        <Typography>{userId}</Typography>
      </Box>
    </Link>
  );
}

export default ViewWriter;
