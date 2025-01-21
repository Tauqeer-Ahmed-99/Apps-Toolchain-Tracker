import * as React from "react";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getAppServices from "@/database/actions/getAppServices";
import ServiceTile from "./ServiceTile";
import Results from "./Results";
import { Routes } from "@/routes";

const ServicesList = async ({ appId }: { appId: string }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect(Routes.Auth);
  }

  if (!appId) {
    return notFound();
  }

  const appServices = await getAppServices(appId);

  return appServices.length > 0 ? (
    <Box>
      <Results results={appServices.length} />
      {appServices.map((service) => (
        <ServiceTile key={service.serviceId} service={service} />
      ))}
    </Box>
  ) : (
    <Box display="flex" justifyContent="center">
      <Typography variant="subtitle2">No Service Added.</Typography>
    </Box>
  );
};

export default ServicesList;
