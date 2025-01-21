import { Service } from "@/lib/models";
import database from "..";

export const getAppServices = async (appId: string): Promise<Service[]> => {
  try {
    const appServices = await database.query.Services.findMany({
      where: (fields, { eq }) => eq(fields.appId, appId),
      orderBy: (fields, { asc }) => asc(fields.createdOn),
      with: { cost: true },
    });

    return appServices;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getAppServices;
