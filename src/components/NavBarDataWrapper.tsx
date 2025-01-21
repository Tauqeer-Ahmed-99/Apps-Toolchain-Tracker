import React, { PropsWithChildren } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserApps } from "@/database/actions/getApps";
import NavbarProvider from "@/providers/NavbarProvider";
import { Routes } from "@/routes";

const NavBarDataWrapper = async ({ children }: PropsWithChildren) => {
  const { userId } = await auth();

  if (!userId) {
    redirect(Routes.Auth);
  }

  const userAppsPromise = getUserApps(userId);

  return (
    <NavbarProvider userAppsPromise={userAppsPromise}>
      {children}
    </NavbarProvider>
  );
};

export default NavBarDataWrapper;
