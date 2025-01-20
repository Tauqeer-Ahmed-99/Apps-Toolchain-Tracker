import "server-only";

import { Application } from "@/lib/models";
import database from "..";

export const getUserApps = async (userId: string): Promise<Application[]> => {
  try {
    const userApps = await database.query.Applications.findMany({
      where: (fields, { eq }) => eq(fields.userId, userId),
      with: { services: true },
    });

    return userApps;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUserApp = async (
  userId: string,
  appId: string
): Promise<Application | undefined> => {
  try {
    const userApps = await database.query.Applications.findFirst({
      where: (fields, { eq, and }) =>
        and(eq(fields.userId, userId), eq(fields.appId, appId)),
      with: { services: true },
    });

    return userApps;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
