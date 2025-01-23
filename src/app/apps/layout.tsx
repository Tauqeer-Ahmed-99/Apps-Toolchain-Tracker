import Header from "@/components/Header";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";

const AppsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      spacing={2}
      sx={{
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header />
      <Box my={2}>{children}</Box>
    </Stack>
  );
};

export default AppsLayout;
