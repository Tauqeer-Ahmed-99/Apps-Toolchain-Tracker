import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import DevicesOtherRoundedIcon from "@mui/icons-material/DevicesOtherRounded";

const AppIcon = ({
  appType,
  size,
}: {
  appType: "Web" | "Mobile" | "Desktop" | "Hybrid";
  size?: "lg" | "sm";
}) => {
  const Icon = {
    Web: DevicesRoundedIcon,
    Mobile: SmartphoneRoundedIcon,
    Desktop: DesktopWindowsRoundedIcon,
    Hybrid: DevicesOtherRoundedIcon,
  }[appType];

  return <Icon sx={size === "lg" ? { fontSize: 32 } : undefined} />;
};

export const AppAvatarIcon = ({
  appType,
  size,
}: {
  appType: "Web" | "Mobile" | "Desktop" | "Hybrid";
  size?: "lg" | "sm";
}) => {
  return (
    <ListItemAvatar>
      <Avatar
        sx={size === "lg" ? { height: "4rem", width: "4rem" } : undefined}
      >
        <AppIcon size={size} appType={appType} />
      </Avatar>
    </ListItemAvatar>
  );
};
