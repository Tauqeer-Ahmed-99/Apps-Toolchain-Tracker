import DashbaordLoading from "@/components/DashbaordLoading";
import Header from "@/components/Header";
import MainGrid from "@/components/MainGrid";
import { getUserApps } from "@/database/actions/getApps";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Stack from "@mui/material/Stack";
import { Suspense } from "react";

const DashboardScreen = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userAppsPromise = getUserApps(user?.id as string, true);

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
      <Suspense fallback={<DashbaordLoading />}>
        <MainGrid userAppsPromise={userAppsPromise} />
      </Suspense>
    </Stack>
  );
};

export default DashboardScreen;
