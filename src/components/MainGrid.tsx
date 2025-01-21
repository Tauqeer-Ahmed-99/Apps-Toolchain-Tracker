"use client";

import { Application } from "@/lib/models";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import * as React from "react";
import StatCard, { StatCardProps } from "./StatCard";

const statCardData: StatCardProps[] = [
  {
    title: "Applications",
    value: "",
  },
  {
    title: "Total Services",
    value: "",
  },
  {
    title: "Total Unique Services",
    value: "",
  },
];

function mapUserAppsToStatCards(
  userApps: Application[],
  statCardTitles: StatCardProps[]
): StatCardProps[] {
  return statCardTitles.map((statCard) => {
    let value = "0";

    switch (statCard.title) {
      case "Applications": {
        value = userApps.length.toString();
        break;
      }
      case "Total Services": {
        const totalServices = userApps.reduce(
          (sum, app) => sum + (app.services?.length || 0),
          0
        );
        value = totalServices.toString();
        break;
      }
      case "Total Unique Services": {
        const uniqueServiceNames = new Set(
          userApps.flatMap(
            (app) => app.services?.map((service) => service.serviceName) || []
          )
        );
        value = `${uniqueServiceNames.size}`;
        break;
      }
    }

    return {
      ...statCard,
      value,
    };
  });
}

export default function MainGrid({
  userAppsPromise,
}: {
  userAppsPromise: Promise<Application[]>;
}) {
  const userApps = React.use(userAppsPromise);

  const data = mapUserAppsToStatCards(userApps, statCardData);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
