import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuButton from "./MenuButton";
import MenuContent from "./MenuContent";
import CardAlert from "./CardAlert";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { getShortenedText } from "@/lib/utils";
import { Routes } from "@/routes";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
  const { user } = useUser();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="large"
              alt={user?.username ?? "Avatar"}
              src={user?.imageUrl}
              sx={{ width: 36, height: 36 }}
            />
            <Box>
              <Tooltip title={user?.fullName ?? user?.username ?? ""}>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    fontWeight: 500,
                    lineHeight: "16px",
                    cursor: "pointer",
                  }}
                >
                  {getShortenedText(user?.fullName ?? user?.username ?? "", 20)}
                </Typography>
              </Tooltip>
              <Tooltip
                title={
                  user?.emailAddresses?.[0].emailAddress ??
                  user?.primaryPhoneNumber?.phoneNumber ??
                  ""
                }
              >
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", cursor: "pointer" }}
                >
                  {getShortenedText(
                    user?.emailAddresses?.[0].emailAddress ??
                      user?.primaryPhoneNumber?.phoneNumber ??
                      "",
                    30
                  )}
                </Typography>
              </Tooltip>
            </Box>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <SignOutButton signOutOptions={{ redirectUrl: Routes.Auth }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<LogoutRoundedIcon />}
            >
              Logout
            </Button>
          </SignOutButton>
        </Stack>
      </Stack>
    </Drawer>
  );
}
