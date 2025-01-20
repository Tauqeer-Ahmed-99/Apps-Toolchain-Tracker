import { eq } from "drizzle-orm";
import database from "..";
import { Applications } from "../schema";

export const addApplication = async ({
  appName,
  appDescription,
  appType,
  userId,
}: {
  appName: string;
  appDescription?: string;
  appType: "Web" | "Mobile" | "Desktop" | "Hybrid";
  userId: string;
}) => {
  const app = await database
    .insert(Applications)
    .values({
      appName,
      appDescription,
      appType,
      userId,
    })
    .returning();

  return app?.[0];
};

export const udpateApplication = async ({
  appId,
  appName,
  appDescription,
  appType,
  userId,
}: {
  appId?: string;
  appName: string;
  appDescription?: string;
  appType: "Web" | "Mobile" | "Desktop" | "Hybrid";
  userId: string;
}) => {
  const app = await database
    .update(Applications)
    .set({ appName, appDescription, appType, userId })
    .where(eq(Applications.appId, appId as string))
    .returning();

  return app?.[0];
};

export const removeApplication = async (appId: string) => {
  const app = await database
    .delete(Applications)
    .where(eq(Applications.appId, appId))
    .returning();

  return app?.[0];
};
