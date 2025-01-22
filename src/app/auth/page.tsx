"use client";

import ColorModeIconDropdown from "@/components/ColorModeIconDropdown";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignInScreen() {
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Box display="flex" justifyContent="end">
        <ColorModeIconDropdown />
      </Box>
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            p: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box display="flex" alignItems="center" gap={2} width={"100%"}>
            <Typography variant="h3">Apps </Typography>
            <Typography
              variant="h3"
              borderRadius={1}
              padding={1}
              paddingY={0}
              color="#FFFFFF"
              bgcolor={(theme) => theme.palette.primary.main}
            >
              Toolchain
            </Typography>
            <Typography variant="h3">Tracker </Typography>
          </Box>
          <LoginLink style={{ width: "100%" }}>
            <Button variant="contained" fullWidth>
              Signin
            </Button>
          </LoginLink>
          <Divider orientation="horizontal" flexItem>
            or
          </Divider>
          <RegisterLink style={{ width: "100%" }}>
            <Button variant="outlined" fullWidth>
              Signup
            </Button>
          </RegisterLink>
        </Card>
      </Box>
    </SignInContainer>
  );
}
