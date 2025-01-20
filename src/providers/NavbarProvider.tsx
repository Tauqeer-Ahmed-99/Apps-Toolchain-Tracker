"use client";

import AppNavBar from "@/components/AppNavBar";
import SideMenu from "@/components/SideMenu";
import Box from "@mui/material/Box";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import routes from "@/routes";
import { match } from "path-to-regexp";

const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const showNavBar = routes.find((route) =>
    match(route.path)(pathname)
  )?.showNavbar;

  return (
    <Box sx={{ display: "flex" }}>
      {showNavBar && <SideMenu />}
      {showNavBar && <AppNavBar />}
      <Box component="main" width="100%" p={showNavBar ? "1rem" : undefined}>
        {children}
      </Box>
    </Box>
  );
};

export default NavbarProvider;
