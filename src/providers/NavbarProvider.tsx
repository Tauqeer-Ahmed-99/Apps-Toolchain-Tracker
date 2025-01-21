"use client";

import AppNavBar from "@/components/AppNavBar";
import SideMenu from "@/components/SideMenu";
import Box from "@mui/material/Box";
import React, { ReactNode, use } from "react";
import { usePathname } from "next/navigation";
import routes from "@/routes";
import { match } from "path-to-regexp";
import { Application } from "@/lib/models";

const NavbarProvider = ({
  children,
  userAppsPromise,
}: {
  children: ReactNode;
  userAppsPromise: Promise<Application[]>;
}) => {
  const pathname = usePathname();
  const userApps = use(userAppsPromise);

  const showNavBar = routes.find((route) =>
    match(route.path)(pathname)
  )?.showNavbar;

  return (
    <Box sx={{ display: "flex" }}>
      {showNavBar && <SideMenu userApps={userApps} />}
      {showNavBar && <AppNavBar />}
      <Box component="main" width="100%" p={showNavBar ? "1rem" : undefined}>
        {children}
      </Box>
    </Box>
  );
};

export default NavbarProvider;
