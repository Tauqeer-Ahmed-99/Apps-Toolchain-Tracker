"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { deleteApplication } from "@/server/actions";
import { Application, ServerActionStatus } from "@/lib/models";
import Dialog from "@mui/material/Dialog";
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes";

const DeleteAppButton = ({
  app,
  disabled,
}: {
  app: Application;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const openConfirmation = () => {
    setOpen(true);
  };

  const closeConfirmation = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    closeConfirmation();

    setLoading(true);

    const formData = new FormData();
    formData.set("appId", app.appId);

    const res = await deleteApplication(
      {
        status: ServerActionStatus.NotInitialized,
        message: "",
        formState: { appId: app.appId },
      },
      formData
    );

    setLoading(false);

    if (res.status === "error") {
      setError(res.message);
    }

    if (res.status === "success") {
      router.replace(Routes.Applications);
    }
  };

  return (
    <>
      <Button
        color="error"
        onClick={openConfirmation}
        loading={loading}
        disabled={disabled}
      >
        Delete
      </Button>

      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Application</DialogTitle>
        <DialogContent>Delete Application '{app.appName}'?</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmation}>Cancel</Button>
          <Button variant="contained" onClick={handleAction}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loading} maxWidth="xs" fullWidth>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <CircularProgress size={24} /> Deleting Application...
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(error)} maxWidth="sm" fullWidth>
        <DialogTitle>Error</DialogTitle>
        <DialogContent sx={{ color: "red" }}>{error}</DialogContent>
        <DialogActions>
          <Button onClick={() => setError("")}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAppButton;
