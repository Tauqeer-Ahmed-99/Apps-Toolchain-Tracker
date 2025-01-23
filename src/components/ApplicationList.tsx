"use client";

import useDebouncedApiQuery from "@/hooks/useDebouncedApiQuery";
import { APIResponse, Application } from "@/lib/models";
import { APIRoutes } from "@/routes";
import { TextField } from "@mui/material";
import { useState } from "react";
import ApplicationTile from "./ApplicationTile";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Results from "./Results";
import ApplicationLoading from "./ApplicationLoading";

const ApplicationList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useDebouncedApiQuery<APIResponse<Application[]>>(
    APIRoutes.SearchApps.replace(
      ":searchTerm",
      searchTerm ? searchTerm : "all"
    ),
    {
      debounceSearchTerm: searchTerm,
      debounceTime: 300,
    }
  );

  return (
    <Box>
      <TextField
        name="searchTerm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        placeholder="Search Applications..."
      />
      <Results results={data?.data.length ?? 0} />

      {isLoading && <ApplicationLoading />}

      {!isLoading && (
        <Box>
          {data?.data?.length ?? 0 > 0 ? (
            data?.data.map((app) => (
              <ApplicationTile key={app.appId} app={app} />
            ))
          ) : (
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle2">
                No Application Available.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ApplicationList;
