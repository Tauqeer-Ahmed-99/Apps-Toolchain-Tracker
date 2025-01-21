"use client";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid2";

const DashbaordLoading = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Skeleton width={160} height={40} />
      <Grid container spacing={2} columns={12}>
        {[...new Array(4)].map((_item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Skeleton height={150} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashbaordLoading;
