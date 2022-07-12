import { login } from "../service/auth";
import LightDarkToggle from "../components/LightDarkToggle";
import { Button, Box, Typography, Container, Link } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/shine-jung">
        shine-jung
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CodeIcon fontSize="large" sx={{ m: 2 }} />
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
        <Typography sx={{ mb: 1 }}>구글 또는 깃허브 계정으로 로그인</Typography>
        <LightDarkToggle />
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default SignIn;
