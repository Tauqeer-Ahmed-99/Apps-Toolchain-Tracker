import React from "react";
import Stack from "@mui/material/Stack";
import Header from "@/components/Header";
import AppsHeader from "@/components/AppsHeader";
import Box from "@mui/material/Box";

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
