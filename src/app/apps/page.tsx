import React, { Suspense } from "react";
import ApplicationList from "@/components/ApplicationList";
import AppsHeader from "@/components/AppsHeader";
import ApplicationLoading from "@/components/ApplicationLoading";

const ApplicationsScreen = async () => {
  return (
    <>
      <AppsHeader />
      <Suspense fallback={<ApplicationLoading />}>
        <ApplicationList />
      </Suspense>
    </>
  );
};

export default ApplicationsScreen;
