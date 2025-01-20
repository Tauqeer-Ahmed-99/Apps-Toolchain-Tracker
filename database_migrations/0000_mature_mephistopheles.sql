CREATE SCHEMA "Application_Toolchain_Tracker_Schema";
--> statement-breakpoint
CREATE TABLE "Application_Toolchain_Tracker_Schema"."Applications" (
	"appId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"appName" varchar(255) NOT NULL,
	"appDescription" varchar(500),
	"userId" text NOT NULL,
	"createdOn" timestamp DEFAULT now() NOT NULL,
	"updatedOn" timestamp DEFAULT now() NOT NULL
);
