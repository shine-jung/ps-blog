import { useEffect } from "react";
import { login } from "../services/auth";
import { Button, Box, Typography, Container } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

function LogIn() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `로그인 - pslog`;
  }, []);
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CodeIcon fontSize="large" sx={{ mt: 2 }} />
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            mb: 3,
            fontFamily: "Spoqa Han Sans Neo, monospace",
            fontWeight: 300,
            letterSpacing: "0.25rem",
          }}
        >
          pslog
        </Typography>
        <Typography variant="h5">야, 너두 코테 합격할 수 있어</Typography>
        <Box sx={{ mt: 8 }}>
          <Button
            onClick={() => login("google")}
            fullWidth
            variant="contained"
            color="success"
            sx={{ mb: 2 }}
          >
            <Typography sx={{ mr: 1 }}>Continue with Google</Typography>
            <FontAwesomeIcon icon={faGoogle} />
          </Button>
          <Button
            onClick={() => login("github")}
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mb: 3 }}
          >
            <Typography sx={{ mr: 1 }}>Continue with Github</Typography>
            <FontAwesomeIcon icon={faGithub} />
          </Button>
        </Box>
        <Typography>구글 또는 깃허브 계정으로 로그인</Typography>
      </Box>
    </Container>
  );
}

export default LogIn;
