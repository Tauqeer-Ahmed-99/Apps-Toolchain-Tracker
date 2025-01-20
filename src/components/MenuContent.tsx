import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import routes from "@/routes";
import Link from "./Link";
import { usePathname } from "next/navigation";

export default function MenuContent() {
  const pathname = usePathname();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {routes
          .filter((route) => route.isNavItem && !route.isSecondary)
          .map((route, index) => (
            <Link key={index} href={route.path}>
              <ListItem
                sx={{ textDecoration: "none", display: "flex" }}
                disablePadding
              >
                <ListItemButton selected={pathname?.includes(route.path)}>
                  <ListItemIcon>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
      </List>
      <List dense>
        {routes
          .filter((route) => route.isNavItem && route.isSecondary)
          .map((route, index) => (
            <Link key={index} href={route.path}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton selected={pathname?.includes(route.path)}>
                  <ListItemIcon>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
      </List>
    </Stack>
  );
}
