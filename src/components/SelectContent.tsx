"use client";

import { Application } from "@/lib/models";
import { Routes } from "@/routes";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import MuiAvatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import * as React from "react";
import AddApp from "./AddApp";
import { AppIcon } from "./AppAvatarIcon";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent({
  userApps,
}: {
  userApps: Application[];
}) {
  const [app, setApp] = React.useState("");
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setApp(event.target.value as string);
  };

  return (
    <Select
      labelId="app-select"
      id="app-simple-select"
      value={(app ? app : userApps?.[0]?.appId) ?? "DefaultItem"}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select App" }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        "&.MuiList-root": {
          p: "8px",
        },
        [`& .${selectClasses.select}`]: {
          display: "flex",
          alignItems: "center",
          gap: "2px",
          pl: 1,
        },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
      {userApps.map((app) => (
        <MenuItem
          key={app.appId}
          value={app.appId}
          onClick={() =>
            router.prefetch(
              `${Routes.ApplicationDetails.replace(":appId", app.appId)}?name=${
                app.appName
              }`
            )
          }
        >
          <ListItemAvatar>
            <Avatar>
              <AppIcon appType={app.appType} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={app.appName}
            secondary={`${app.appType} App`}
          />
        </MenuItem>
      ))}
      <MenuItem value={"DefaultItem"}>
        <ListItemAvatar>
          <Avatar alt="Add new App">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Add New App" secondary="Web, Mobile" />
      </MenuItem>
      <Divider sx={{ mx: -1 }} />
      <AddApp />
    </Select>
  );
}
