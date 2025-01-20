import React from "react";
import { getUserApp } from "@/database/actions/getApps";
import { auth } from "@clerk/nextjs/server";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound, unauthorized } from "next/navigation";
import AddService from "@/components/AddService";
import ServicesList from "@/components/ServicesList";
import EditApp from "@/components/AddApp";
import { AppAvatarIcon } from "@/components/AppAvatarIcon";

const ApplicationDetailsScreen = async ({
  params,
}: {
  params: Promise<{ appId: string }>;
}) => {
  const { userId } = await auth();

  if (!userId) {
    unauthorized();
  }

  const appId = (await params).appId;

  if (!appId) {
    notFound();
  }

  const app = await getUserApp(userId, appId);

  if (!app) {
    notFound();
  }

  return (
    <Stack direction="column" gap={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <AppAvatarIcon size="lg" appType={app.appType} />
          <Box>
            <Typography variant="h3">{app.appName}</Typography>
            <Typography variant="subtitle1">{app.appType} App</Typography>
          </Box>
        </Box>
        <EditApp app={app} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: "1.5rem" }}>Services</Typography>
        <AddService />
      </Box>
      <ServicesList appId={appId} />
    </Stack>
  );
};

export default ApplicationDetailsScreen;
