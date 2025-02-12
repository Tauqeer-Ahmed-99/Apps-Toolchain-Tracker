import EditApp from "@/components/AddApp";
import AddService from "@/components/AddService";
import { AppAvatarIcon } from "@/components/AppAvatarIcon";
import ServicesLoading from "@/components/ApplicationLoading";
import ServicesList from "@/components/ServicesList";
import { getUserApp } from "@/database/actions/getApps";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const ApplicationDetailsScreen = async ({
  params,
}: {
  params: Promise<{ appId: string }>;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const appId = (await params).appId;

  if (!appId) {
    notFound();
  }

  const app = await getUserApp(user?.id as string, appId);

  if (!app) {
    notFound();
  }

  return (
    <Stack direction="column" gap={4}>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2 },
          alignItems: { sm: "center" },
          justifyContent: { sm: "space-between" },
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <AppAvatarIcon size="lg" appType={app.appType} />
          <Box>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
            >
              {app.appName}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
            >
              {app.appType} App
            </Typography>
          </Box>
        </Box>
        <EditApp app={app} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: "1.5rem" }}>Services</Typography>
        <AddService />
      </Box>
      <Suspense fallback={<ServicesLoading />}>
        <ServicesList appId={appId} />
      </Suspense>
    </Stack>
  );
};

export default ApplicationDetailsScreen;
