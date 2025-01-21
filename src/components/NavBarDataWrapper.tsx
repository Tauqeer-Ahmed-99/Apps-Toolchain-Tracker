import React, { PropsWithChildren } from "react";
import { auth } from "@clerk/nextjs/server";
import { unauthorized } from "next/navigation";
import { getUserApps } from "@/database/actions/getApps";
import NavbarProvider from "@/providers/NavbarProvider";

const NavBarDataWrapper = async ({ children }: PropsWithChildren) => {
  const { userId } = await auth();

  if (!userId) {
    unauthorized();
  }

  const userAppsPromise = getUserApps(userId);

  return (
    <NavbarProvider userAppsPromise={userAppsPromise}>
      {children}
    </NavbarProvider>
  );
};

export default NavBarDataWrapper;
