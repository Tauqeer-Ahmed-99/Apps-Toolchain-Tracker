import { eq } from "drizzle-orm";
import database from "..";
import { Services } from "../schema";

export const addService = async ({
  appId,
  serviceName,
  serviceDescription,
}: {
  appId: string;
  serviceName: string;
  serviceDescription?: string;
}) => {
  const service = await database
    .insert(Services)
    .values({
      appId,
      serviceName,
      serviceDescription,
    })
    .returning();

  return service?.[0];
};

export const updateService = async ({
  serviceId,
  appId,
  serviceName,
  serviceDescription,
}: {
  serviceId: string;
  appId: string;
  serviceName: string;
  serviceDescription?: string;
}) => {
  const service = await database
    .update(Services)
    .set({
      appId,
      serviceName,
      serviceDescription,
    })
    .where(eq(Services.serviceId, serviceId))
    .returning();

  return service?.[0];
};

export const removeService = async (serviceId: string) => {
  const service = await database
    .delete(Services)
    .where(eq(Services.serviceId, serviceId))
    .returning();

  return service?.[0];
};
