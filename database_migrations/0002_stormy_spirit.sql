CREATE TYPE "Application_Toolchain_Tracker_Schema"."CostCycle" AS ENUM('Weekly', 'Monthly', 'Annual');--> statement-breakpoint
CREATE TABLE "Application_Toolchain_Tracker_Schema"."Costs" (
	"costId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"costCycle" "Application_Toolchain_Tracker_Schema"."CostCycle" NOT NULL,
	"cost" numeric NOT NULL,
	"serviceId" uuid NOT NULL,
	"createdOn" timestamp DEFAULT now() NOT NULL,
	"updatedOn" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Application_Toolchain_Tracker_Schema"."Services" (
	"serviceId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"serviceName" varchar(255) NOT NULL,
	"serviceDescription" varchar(500),
	"appId" uuid NOT NULL,
	"createdOn" timestamp DEFAULT now() NOT NULL,
	"updatedOn" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Application_Toolchain_Tracker_Schema"."Costs" ADD CONSTRAINT "Costs_serviceId_Services_serviceId_fk" FOREIGN KEY ("serviceId") REFERENCES "Application_Toolchain_Tracker_Schema"."Services"("serviceId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Application_Toolchain_Tracker_Schema"."Services" ADD CONSTRAINT "Services_appId_Applications_appId_fk" FOREIGN KEY ("appId") REFERENCES "Application_Toolchain_Tracker_Schema"."Applications"("appId") ON DELETE no action ON UPDATE no action;