import { PropsWithChildren } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserApps } from "@/database/actions/getApps";
import NavbarProvider from "@/providers/NavbarProvider";

const NavBarDataWrapper = async ({ children }: PropsWithChildren) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if (!userId) {
  //   redirect(Routes.Auth);
  // }

  const userAppsPromise = getUserApps(user?.id as string);

  return (
    <NavbarProvider userAppsPromise={userAppsPromise}>
      {children}
    </NavbarProvider>
  );
};

export default NavBarDataWrapper;
