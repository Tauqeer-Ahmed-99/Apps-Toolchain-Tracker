import { z, ZodError } from "zod";

export const parseZodErrorMessage = (errors: ZodError<{}>) => {
  return Object.values(errors.flatten().fieldErrors)
    .map((err) => (err as []).join(", "))
    .join(", ");
};

export const AddAppFormSchema = z.object({
  userId: z
    .string({ message: "userId must be a valid uuid." })
    .nonempty({ message: "userId is required." }),
  appId: z
    .string({ message: "appId must be a valid uuid." })
    .uuid({ message: "appId must be a valid uuid." })
    .optional(),
  appName: z
    .string({ message: "App name must be of type string." })
    .nonempty({ message: "App name is required." })
    .max(255, { message: "App name must be under 255 chars." }),
  appDescription: z
    .string({ message: "App description must be of type string." })
    .max(500, { message: "App description must be under 500 chars." })
    .optional(),
  appType: z.enum(["Web", "Mobile", "Desktop", "Hybrid"], {
    message: "App type must be from list Web, Mobile, Desktop or Hybrid.",
  }),
});

export const DeleteAppFormSchema = z.object({
  appId: z
    .string({ message: "appId must be a valid uuid." })
    .uuid({ message: "appId must be a valid uuid." }),
});

export const AddServiceFormSchema = z.object({
  userId: z
    .string({ message: "userId must be a valid uuid." })
    .nonempty({ message: "userId is required." }),
  appId: z
    .string({ message: "appId must be a valid uuid." })
    .uuid({ message: "appId must be a valid uuid." })
    .nonempty({ message: "appId is required." }),
  serviceId: z
    .string({ message: "serviceId must be a valid uuid." })
    .uuid({ message: "serviceId must be a valid uuid." })
    .optional(),
  serviceName: z
    .string({ message: "Service name must be of type string." })
    .nonempty({ message: "Service name is required." })
    .max(255, { message: "Service name must be under 255 chars." }),
  serviceCost: z.string({ message: "Service cost must be of type string." }),
  serviceCostCycle: z.enum(["Weekly", "Monthly", "Annual"], {
    message: "App type must be from list Weekly, Monthly or Annual.",
  }),
  serviceDescription: z
    .string({ message: "App description must be of type string." })
    .max(500, { message: "App description must be under 500 chars." })
    .optional(),
});

export const DeleteServiceFormSchema = z.object({
  serviceId: z
    .string({ message: "serviceId must be a valid uuid." })
    .uuid({ message: "serviceId must be a valid uuid." }),
});
