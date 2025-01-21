"use client";

import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const ApplicationLoading = () => {
  return (
    <Box>
      {[...new Array(5)].map((_, index) => (
        <Skeleton key={index} height={100} />
      ))}
    </Box>
  );
};

export default ApplicationLoading;
