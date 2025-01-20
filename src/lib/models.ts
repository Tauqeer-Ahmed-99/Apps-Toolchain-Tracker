export enum ServerActionStatus {
  NotInitialized = "not-initialized",
  Success = "success",
  Error = "error",
}

export interface ServerActionState<T = undefined> {
  status: ServerActionStatus;
  message: string;
  formState: T;
  data?: unknown;
}

export enum AppType {
  Web = "Web",
  Mobile = "Mobile",
  Desktop = "Desktop",
  Hybrid = "Hybrid",
}

export interface Application {
  appId: string;
  appName: string;
  appDescription: string | null;
  userId: string;
  appType: "Web" | "Mobile" | "Desktop" | "Hybrid";
  services?: Service[];
  createdOn: Date;
  updatedOn: Date;
}

export interface Service {
  appId: string;
  createdOn: Date;
  updatedOn: Date;
  serviceId: string;
  serviceName: string;
  serviceDescription: string | null;
  cost?: Cost;
}

export interface Cost {
  createdOn: Date;
  updatedOn: Date;
  serviceId: string;
  costId: string;
  costCycle: "Weekly" | "Monthly" | "Annual";
  cost: string;
}
