import { auth } from "@clerk/nextjs/server";

const APP_NAME = "apps-toolchain-tracker";

export const hasAppPermissions = async (): Promise<boolean> => {
  const { sessionClaims } = await auth();

  const appAccess = sessionClaims?.public_metadata?.appsAccess;

  return Boolean(appAccess?.includes(APP_NAME));
};
