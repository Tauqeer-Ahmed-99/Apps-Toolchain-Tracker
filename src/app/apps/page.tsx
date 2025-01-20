import React, { Suspense } from "react";
import Stack from "@mui/material/Stack";
import ApplicationList from "@/components/ApplicationList";
import AppsHeader from "@/components/AppsHeader";

const ApplicationsScreen = async () => {
  return (
    <>
      <AppsHeader />
      <Suspense>
        <ApplicationList />
      </Suspense>
    </>
  );
};

export default ApplicationsScreen;
