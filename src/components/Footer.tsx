import { Box, Container, Link, Typography } from "@mui/material";
import LightDarkToggle from "./LightDarkToggle";

function Footer() {
  return (
    <Container component="footer">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        mb={4}
      >
        <Typography color="text.secondary" mb={2}>
          Copyright ©{" "}
          <Link
            color="inherit"
            href="https://github.com/shine-jung"
            target="_blank"
            rel="noopener"
          >
            shine-jung
          </Link>{" "}
          {new Date().getFullYear()}. All Rights Reserved.
        </Typography>
        <LightDarkToggle />
      </Box>
    </Container>
  );
}

export default Footer;
