import { eq } from "drizzle-orm";
import database from "..";
import { Costs } from "../schema";

export const addCost = async ({
  serviceId,
  cost,
  costCycle,
}: {
  serviceId: string;
  cost: string;
  costCycle: "Weekly" | "Monthly" | "Annual";
}) => {
  const costRec = await database
    .insert(Costs)
    .values({
      serviceId,
      cost,
      costCycle,
    })
    .returning();

  return costRec?.[0];
};

export const updateCost = async ({
  serviceId,
  cost,
  costCycle,
}: {
  serviceId: string;
  cost: string;
  costCycle: "Weekly" | "Monthly" | "Annual";
}) => {
  const costRec = await database
    .update(Costs)
    .set({
      cost,
      costCycle,
    })
    .where(eq(Costs.serviceId, serviceId))
    .returning();

  return costRec?.[0];
};
