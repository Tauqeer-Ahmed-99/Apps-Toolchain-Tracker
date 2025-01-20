import Stack from "@mui/material/Stack";

import Header from "./Header";
import MainGrid from "./MainGrid";

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header />
      <MainGrid />
    </Stack>
  );
}
