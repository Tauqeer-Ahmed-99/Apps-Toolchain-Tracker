import * as React from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserApps } from "@/database/actions/getApps";
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ApplicationTile from "./ApplicationTile";
import Results from "./Results";
import { Routes } from "@/routes";

const ApplicationList = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect(Routes.Auth);
  }

  const apps = await getUserApps(userId);

  return apps.length > 0 ? (
    <Box>
      <Results results={apps.length} />
      <Box>
        {apps.map((app) => (
          <ApplicationTile key={app.appId} app={app} />
        ))}
      </Box>
    </Box>
  ) : (
    <Box display="flex" justifyContent="center">
      <Typography variant="subtitle2">No Application Available.</Typography>
    </Box>
  );
};

export default ApplicationList;
