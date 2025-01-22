"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import SelectContent from "./SelectContent";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getShortenedText } from "@/lib/utils";
import Tooltip from "@mui/material/Tooltip";
import { Application } from "@/lib/models";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu({ userApps }: { userApps: Application[] }) {
  const { user } = useKindeBrowserClient();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <SelectContent userApps={userApps} />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Box
        display="flex"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt={user?.given_name ?? "Avatar"}
          src={user?.picture ?? undefined}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Tooltip title={user?.given_name ?? user?.family_name ?? ""}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                fontWeight: 500,
                lineHeight: "16px",
                cursor: "pointer",
              }}
            >
              {getShortenedText(
                user?.given_name ?? user?.family_name ?? "",
                16
              )}
            </Typography>
          </Tooltip>
          <Tooltip title={user?.email ?? ""}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", cursor: "pointer" }}
            >
              {getShortenedText(user?.email ?? "", 20)}
            </Typography>
          </Tooltip>
        </Box>
        <OptionsMenu />
      </Box>
    </Drawer>
  );
}
