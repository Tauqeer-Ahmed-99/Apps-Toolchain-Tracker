import React from "react";
import { Application } from "@/lib/models";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

import Link from "./Link";
import { Routes } from "@/routes";
import { AppAvatarIcon } from "./AppAvatarIcon";

const ApplicationTile = ({ app }: { app: Application }) => {
  console.log(app.services);
  return (
    <Link
      href={`${Routes.ApplicationDetails.replace(":appId", app.appId)}?name=${
        app.appName
      }`}
    >
      <MenuItem sx={{ py: 2 }}>
        <AppAvatarIcon appType={app.appType} />
        <ListItemText primary={app.appName} secondary={`${app.appType} App`} />
        <Box>
          <Typography>Services : {app.services?.length ?? 0}</Typography>
        </Box>
      </MenuItem>
    </Link>
  );
};

export default ApplicationTile;
