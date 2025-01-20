ALTER TABLE "Application_Toolchain_Tracker_Schema"."Costs" DROP CONSTRAINT "Costs_serviceId_Services_serviceId_fk";
--> statement-breakpoint
ALTER TABLE "Application_Toolchain_Tracker_Schema"."Services" DROP CONSTRAINT "Services_appId_Applications_appId_fk";
--> statement-breakpoint
ALTER TABLE "Application_Toolchain_Tracker_Schema"."Costs" ADD CONSTRAINT "Costs_serviceId_Services_serviceId_fk" FOREIGN KEY ("serviceId") REFERENCES "Application_Toolchain_Tracker_Schema"."Services"("serviceId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Application_Toolchain_Tracker_Schema"."Services" ADD CONSTRAINT "Services_appId_Applications_appId_fk" FOREIGN KEY ("appId") REFERENCES "Application_Toolchain_Tracker_Schema"."Applications"("appId") ON DELETE cascade ON UPDATE no action;