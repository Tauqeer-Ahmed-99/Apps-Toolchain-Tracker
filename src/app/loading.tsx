import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const DashbaordLoading = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="subtitle1">Apps Toolchain Tracker</Typography>
        <CircularProgress size={32} />
      </Box>
    </Box>
  );
};

export default DashbaordLoading;
