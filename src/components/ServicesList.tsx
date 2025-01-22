import getAppServices from "@/database/actions/getAppServices";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import Results from "./Results";
import ServiceTile from "./ServiceTile";

const ServicesList = async ({ appId }: { appId: string }) => {
  // if (!userId) {
  //   redirect(Routes.Auth);
  // }

  if (!appId) {
    return notFound();
  }

  const appServices = await getAppServices(appId);

  return appServices.length > 0 ? (
    <Box>
      <Results results={appServices.length} />
      {appServices.map((service) => (
        <ServiceTile key={service.serviceId} service={service} />
      ))}
    </Box>
  ) : (
    <Box display="flex" justifyContent="center">
      <Typography variant="subtitle2">No Service Added.</Typography>
    </Box>
  );
};

export default ServicesList;
