import Header from "@/components/Header";
import Stack from "@mui/material/Stack";
import React from "react";

const FeedbackScreen = () => {
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
      Feedback Screen
    </Stack>
  );
};

export default FeedbackScreen;
