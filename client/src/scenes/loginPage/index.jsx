import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Logo from "components/Logo";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Logo/>
        {/* <Typography fontWeight="bold" fontSize="32px" color="primary">
          AstralWave
        </Typography> */}
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Introducing AstralWave, the social media platform where boundaries
          vanish, and connections flourish. Join us on a captivating digital
          journey, where dreams become reality, and friendships await. Embrace
          the infinite possibilities of AstralWave's celestial realm with every
          login, and embark on a cosmic adventure of meaningful connections.
          Discover a universe of shared experiences like no other. Welcome
          aboard AstralWave, where the stars align for extraordinary
          connections.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
