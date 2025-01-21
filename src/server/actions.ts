"use server";
import "server-only";

import { revalidatePath } from "next/cache";
import { Routes } from "@/routes";

import {
  AddAppFormState,
  AddServiceFormState,
  DeleteAppFormState,
  DeleteServiceFormState,
} from "@/lib/formModels";
import {
  AddAppFormSchema,
  AddServiceFormSchema,
  DeleteAppFormSchema,
  DeleteServiceFormSchema,
  parseZodErrorMessage,
} from "@/lib/formSchema";
import {
  Application,
  Cost,
  ServerActionState,
  ServerActionStatus,
  Service,
} from "@/lib/models";
import { hasAppPermissions } from "@/lib/permissions";
import {
  addApplication,
  removeApplication,
  udpateApplication,
} from "@/database/actions/addApplication";
import {
  addService,
  removeService,
  updateService,
} from "@/database/actions/addService";
import { addCost, updateCost } from "@/database/actions/addCost";

export const createUpdateApplication = async (
  prevState: ServerActionState<AddAppFormState>,
  formData: FormData
): Promise<ServerActionState<AddAppFormState>> => {
  try {
    const hasPermission = await hasAppPermissions();

    if (!hasPermission) {
      return {
        status: ServerActionStatus.Error,
        message: "Permission Not Allowed.",
        formState: { ...prevState.formState },
      };
    }

    const appDetails = {
      userId: formData.get("userId")?.toString(),
      appId: formData.get("appId")?.toString(),
      appName: formData.get("appName")?.toString(),
      appDescription: formData.get("appName")?.toString(),
      appType: formData.get("appType")?.toString() as "Web",
    };

    const validatedFields = AddAppFormSchema.safeParse(appDetails);

    if (!validatedFields.success) {
      return {
        status: ServerActionStatus.Error,
        message: parseZodErrorMessage(validatedFields.error),
        formState: {
          appId: appDetails.appId ?? "",
          userId: appDetails.userId ?? "",
          appName: appDetails.appName ?? "",
          appDescription: appDetails.appDescription ?? "",
          appType: appDetails.appType,
        },
      };
    }

    let app: Application;

    if (!appDetails.appId) {
      app = await addApplication(validatedFields.data);

      revalidatePath(Routes.Applications);
    } else {
      app = await udpateApplication(validatedFields.data);

      revalidatePath(
        Routes.ApplicationDetails.replace(":appId", appDetails.appId)
      );
    }

    return {
      message: appDetails.appId ? "App Updated." : "App Created.",
      status: ServerActionStatus.Success,
      formState: {
        userId: appDetails.appId ? validatedFields.data.userId : "",
        appId: appDetails.appId ? app.appId : "",
        appName: appDetails.appId ? app.appName : "",
        appDescription: appDetails.appId ? app.appDescription ?? "" : "",
        appType: appDetails.appId ? (app.appName as "Web") : "Web",
      },
      data: app,
    };
  } catch (error) {
    console.log(error);
    return {
      status: ServerActionStatus.Error,
      message: (error as Error).message,
      formState: {
        userId: formData.get("userId")?.toString() ?? "",
        appId: formData.get("appId")?.toString() ?? "",
        appName: formData.get("appName")?.toString() ?? "",
        appDescription: formData.get("appDescription")?.toString() ?? "",
        appType: (formData.get("appType")?.toString() as "Web") ?? "Web",
      },
    };
  }
};

export const deleteApplication = async (
  prevState: ServerActionState<DeleteAppFormState>,
  formData: FormData
): Promise<ServerActionState<DeleteAppFormState>> => {
  try {
    const hasPermission = await hasAppPermissions();

    if (!hasPermission) {
      return {
        status: ServerActionStatus.Error,
        message: "Permission Not Allowed.",
        formState: { ...prevState.formState },
      };
    }

    const appDetails = {
      appId: formData.get("appId")?.toString(),
    };

    const validatedFields = DeleteAppFormSchema.safeParse(appDetails);

    if (!validatedFields.success) {
      return {
        status: ServerActionStatus.Error,
        message: parseZodErrorMessage(validatedFields.error),
        formState: {
          appId: appDetails.appId ?? "",
        },
      };
    }

    const app = await removeApplication(validatedFields.data.appId);

    return {
      message: "App Removed.",
      status: ServerActionStatus.Success,
      formState: {
        appId: "",
      },
      data: app,
    };
  } catch (error) {
    console.log(error);
    return {
      status: ServerActionStatus.Error,
      message: (error as Error).message,
      formState: {
        appId: formData.get("appId")?.toString() ?? "",
      },
    };
  }
};

export const createUpdateService = async (
  prevState: ServerActionState<AddServiceFormState>,
  formData: FormData
): Promise<ServerActionState<AddServiceFormState>> => {
  try {
    const hasPermission = await hasAppPermissions();

    if (!hasPermission) {
      return {
        status: ServerActionStatus.Error,
        message: "Permission Not Allowed.",
        formState: { ...prevState.formState },
      };
    }

    const appDetails = {
      userId: formData.get("userId")?.toString(),
      appId: formData.get("appId")?.toString(),
      serviceId: formData.get("serviceId")?.toString(),
      serviceName: formData.get("serviceName")?.toString(),
      serviceCost: formData.get("serviceCost")?.toString(),
      serviceCostCycle: formData.get("serviceCostCycle")?.toString(),
      serviceDescription: formData.get("serviceDescription")?.toString(),
    };

    const validatedFields = AddServiceFormSchema.safeParse(appDetails);

    if (!validatedFields.success) {
      return {
        status: ServerActionStatus.Error,
        message: parseZodErrorMessage(validatedFields.error),
        formState: {
          userId: appDetails.userId ?? "",
          appId: appDetails.appId ?? "",
          serviceId: appDetails.serviceId ?? "",
          serviceName: appDetails.serviceName ?? "",
          serviceCost: appDetails.serviceCost ?? "",
          serviceCostCycle: appDetails.serviceCostCycle ?? "",
          serviceDescription: appDetails.serviceDescription ?? "",
        },
      };
    }

    let service: Service;
    let cost: Cost;

    if (!appDetails.serviceId) {
      service = await addService({
        appId: validatedFields.data.appId,
        serviceName: validatedFields.data.serviceName,
        serviceDescription: validatedFields.data.serviceDescription,
      });

      cost = await addCost({
        serviceId: service.serviceId,
        cost: validatedFields.data.serviceCost,
        costCycle: validatedFields.data.serviceCostCycle,
      });
    } else {
      service = await updateService({
        serviceId: validatedFields.data.serviceId as string,
        appId: validatedFields.data.appId,
        serviceName: validatedFields.data.serviceName,
        serviceDescription: validatedFields.data.serviceDescription,
      });

      cost = await updateCost({
        serviceId: service.serviceId,
        cost: validatedFields.data.serviceCost,
        costCycle: validatedFields.data.serviceCostCycle,
      });
    }

    revalidatePath(
      Routes.ApplicationDetails.replace(":appId", validatedFields.data.appId)
    );

    return {
      message: appDetails.serviceId ? "Service Updated." : "Service Created.",
      status: ServerActionStatus.Success,
      formState: {
        appId: appDetails.serviceId ? appDetails.appId ?? "" : "",
        userId: appDetails.serviceId ? appDetails.userId ?? "" : "",
        serviceId: appDetails.serviceId ? appDetails.serviceId : "",
        serviceCost: appDetails.serviceId ? appDetails.serviceCost ?? "" : "",
        serviceCostCycle: appDetails.serviceId
          ? appDetails.serviceCostCycle ?? ""
          : "",
        serviceDescription: appDetails.serviceId
          ? appDetails.serviceDescription ?? ""
          : "",
        serviceName: appDetails.serviceId ? appDetails.serviceName ?? "" : "",
      },
      data: { ...service, cost: { ...cost } },
    };
  } catch (error) {
    console.log(error);
    return {
      status: ServerActionStatus.Error,
      message: (error as Error).message,
      formState: {
        userId: formData.get("userId")?.toString() ?? "",
        appId: formData.get("appId")?.toString() ?? "",
        serviceId: formData.get("serviceId")?.toString() ?? "",
        serviceName: formData.get("serviceName")?.toString() ?? "",
        serviceCost: formData.get("serviceCost")?.toString() ?? "",
        serviceCostCycle: formData.get("serviceCostCycle")?.toString() ?? "",
        serviceDescription:
          formData.get("serviceDescription")?.toString() ?? "",
      },
    };
  }
};

export const deleteService = async (
  prevState: ServerActionState<DeleteServiceFormState>,
  formData: FormData
): Promise<ServerActionState<DeleteServiceFormState>> => {
  try {
    const hasPermission = await hasAppPermissions();

    if (!hasPermission) {
      return {
        status: ServerActionStatus.Error,
        message: "Permission Not Allowed.",
        formState: { ...prevState.formState },
      };
    }

    const appDetails = {
      serviceId: formData.get("serviceId")?.toString(),
    };

    const validatedFields = DeleteServiceFormSchema.safeParse(appDetails);

    if (!validatedFields.success) {
      return {
        status: ServerActionStatus.Error,
        message: parseZodErrorMessage(validatedFields.error),
        formState: {
          serviceId: appDetails.serviceId ?? "",
        },
      };
    }

    const service = await removeService(validatedFields.data.serviceId);

    revalidatePath(Routes.Applications);

    return {
      message: "Service Removed.",
      status: ServerActionStatus.Success,
      formState: {
        serviceId: "",
      },
      data: service,
    };
  } catch (error) {
    console.log(error);
    return {
      status: ServerActionStatus.Error,
      message: (error as Error).message,
      formState: {
        serviceId: formData.get("serviceId")?.toString() ?? "",
      },
    };
  }
};
