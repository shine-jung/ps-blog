import { Link } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";
import { IUser } from "../modules/types";

interface IViewWriter {
  userObj: IUser | null;
  userId?: string;
}

function ViewWriter({ userObj, userId }: IViewWriter) {
  const userLink = `/@${userObj?.id}`;
  return (
    <Link to={userLink}>
      <Box display="flex">
        <Avatar
          alt={userObj?.name}
          src={userObj?.photoURL}
          sx={{ width: 24, height: 24, mr: 1 }}
        />
        <Typography sx={{ fontWeight: "300" }}>by&nbsp;</Typography>
        <Typography sx={{ fontWeight: "400" }}>{userId}</Typography>
      </Box>
    </Link>
  );
}

export default ViewWriter;
