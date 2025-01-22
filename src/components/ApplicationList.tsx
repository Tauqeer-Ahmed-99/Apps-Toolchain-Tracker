import { getUserApps } from "@/database/actions/getApps";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ApplicationTile from "./ApplicationTile";
import Results from "./Results";

const ApplicationList = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if (!userId) {
  //   redirect(Routes.Auth);
  // }

  const apps = await getUserApps(user?.id as string);

  return apps.length > 0 ? (
    <Box>
      <Results results={apps.length} />
      <Box>
        {apps.map((app) => (
          <ApplicationTile key={app.appId} app={app} />
        ))}
      </Box>
    </Box>
  ) : (
    <Box display="flex" justifyContent="center">
      <Typography variant="subtitle2">No Application Available.</Typography>
    </Box>
  );
};

export default ApplicationList;
