import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const Results = ({ results }: { results: number }) => {
  return (
    <Box display="flex" justifyContent="end" py={1}>
      <Typography variant="caption">Showing {results} Results</Typography>
    </Box>
  );
};

export default Results;
