export interface AddAppFormState {
  userId: string;
  appId: string;
  appName: string;
  appDescription: string;
  appType: "Web" | "Mobile" | "Desktop" | "Hybrid";
}

export interface DeleteAppFormState {
  appId: string;
}

export interface AddServiceFormState {
  userId: string;
  appId: string;
  serviceId: string;
  serviceName: string;
  serviceCost: string;
  serviceCostCycle: string;
  serviceDescription: string;
}

export interface DeleteServiceFormState {
  serviceId: string;
}
