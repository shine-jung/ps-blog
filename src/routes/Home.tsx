import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate({ pathname: "/post" });
  };
  return (
    <>
      <Typography>
        Home<button onClick={onClick}>글쓰기</button>
      </Typography>
    </>
  );
}

export default Home;
