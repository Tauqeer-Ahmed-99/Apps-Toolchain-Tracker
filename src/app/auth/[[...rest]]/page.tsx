"use client";

import ColorModeIconDropdown from "@/components/ColorModeIconDropdown";
import { SignIn } from "@clerk/nextjs";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

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

export default function SignInScreen(props: { disableCustomTheme?: boolean }) {
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
        <SignIn />
      </Box>
    </SignInContainer>
  );
}
