import React from "react";
import { Application } from "@/lib/models";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip, Typography } from "@mui/material";

import Link from "./Link";
import { Routes } from "@/routes";
import { AppAvatarIcon } from "./AppAvatarIcon";

const ApplicationTile = ({ app }: { app: Application }) => {
  return (
    <Link
      href={`${Routes.ApplicationDetails.replace(":appId", app.appId)}?name=${
        app.appName
      }`}
    >
      <MenuItem sx={{ py: 2 }}>
        <AppAvatarIcon appType={app.appType} />
        <ListItemText primary={app.appName} secondary={`${app.appType} App`} />
        <Tooltip
          title={`Total No. of Services Consumed: ${app.services?.length ?? 0}`}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Services :
            </Typography>
            <Typography sx={{ display: { sm: "none" } }}>#</Typography>
            <Typography>{app.services?.length ?? 0}</Typography>
          </Box>
        </Tooltip>
      </MenuItem>
    </Link>
  );
};

export default ApplicationTile;
