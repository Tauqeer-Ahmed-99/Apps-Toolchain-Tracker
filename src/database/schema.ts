import { relations } from "drizzle-orm";
import {
  numeric,
  PgColumn,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ATTSchema = pgSchema("Application_Toolchain_Tracker_Schema");

export const AppType = ATTSchema.enum("AppType", [
  "Web",
  "Mobile",
  "Desktop",
  "Hybrid",
]);

export const Applications = ATTSchema.table("Applications", {
  appId: uuid("appId").primaryKey().defaultRandom(),
  appName: varchar("appName", { length: 255 }).notNull(),
  appDescription: varchar("appDescription", { length: 500 }),
  userId: text("userId").notNull(),
  appType: AppType("appType").notNull(),
  createdOn: timestamp("createdOn").notNull().defaultNow(),
  updatedOn: timestamp("updatedOn")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const Services = ATTSchema.table("Services", {
  serviceId: uuid("serviceId").primaryKey().defaultRandom(),
  serviceName: varchar("serviceName", { length: 255 }).notNull(),
  serviceDescription: varchar("serviceDescription", { length: 500 }),
  appId: uuid("appId")
    .notNull()
    .references((): PgColumn => Applications.appId, { onDelete: "cascade" }),
  createdOn: timestamp("createdOn").notNull().defaultNow(),
  updatedOn: timestamp("updatedOn")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const CostCycle = ATTSchema.enum("CostCycle", [
  "Weekly",
  "Monthly",
  "Annual",
]);

export const Costs = ATTSchema.table("Costs", {
  costId: uuid("costId").primaryKey().defaultRandom(),
  costCycle: CostCycle("costCycle").notNull(),
  cost: numeric("cost").notNull(),
  serviceId: uuid("serviceId")
    .notNull()
    .references((): PgColumn => Services.serviceId, { onDelete: "cascade" }),
  createdOn: timestamp("createdOn").notNull().defaultNow(),
  updatedOn: timestamp("updatedOn")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const applicationsRelations = relations(
  Applications,
  ({ one, many }) => ({
    services: many(Services, {
      relationName: "OneApplicationCanHaveManyServices",
    }),
  })
);

export const servicesRelations = relations(Services, ({ one, many }) => ({
  application: one(Applications, {
    relationName: "OneApplicationCanHaveManyServices",
    fields: [Services.appId],
    references: [Applications.appId],
  }),
  cost: one(Costs, {
    relationName: "OneServiceCanHaveOneCost",
    fields: [Services.serviceId],
    references: [Costs.serviceId],
  }),
}));

export const costsRelations = relations(Costs, ({ one, many }) => ({
  service: one(Services, {
    relationName: "OneServiceCanHaveOneCost",
    fields: [Costs.serviceId],
    references: [Services.serviceId],
  }),
}));
