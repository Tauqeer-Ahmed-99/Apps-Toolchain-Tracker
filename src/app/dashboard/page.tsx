import React, { Suspense } from "react";
import { getUserApps } from "@/database/actions/getApps";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Stack from "@mui/material/Stack";
import Header from "@/components/Header";
import MainGrid from "@/components/MainGrid";
import DashbaordLoading from "@/components/DashbaordLoading";

const DashboardScreen = async () => {
  const { userId } = await auth();

  // if (!userId) {
  //   notFound();
  // }

  const userAppsPromise = getUserApps(userId as string, true);

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
