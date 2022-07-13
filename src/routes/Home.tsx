import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Typography>블로그 홈</Typography>
      <Link to="post">글쓰기</Link>
      <Link to="view">글보기</Link>
    </>
  );
}

export default Home;
