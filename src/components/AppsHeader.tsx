import React from "react";
import Box from "@mui/material/Box";
import AddApp from "./AddApp";
import { Typography } from "@mui/material";

const AppsHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      my={3}
    >
      <Typography variant="h6" gutterBottom>
        Applications
      </Typography>
      <AddApp />
    </Box>
  );
};

export default AppsHeader;
